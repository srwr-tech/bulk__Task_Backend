// Import necessary packages and models
import User from '../models/userModel.js'; // Ensure you use the correct extension for ES modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretkey = process.env.secretkey || "sarwar";

// Define the signUp function
const signUp = async (req, res) => {
    const { username, email, password, mobile_no, referral } = req.body;

    // Log the incoming request body for debugging
    

    try {
        // Validate the input fields
        if (!username || !email || !password) {
            return res.status(400).send('All fields are required.'); // Ensure required fields are specified
        }

        // Check if the email already exists in MongoDB
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send('Email already in use. Please choose another.');
        }

        // Hash the password using bcrypt
        const saltRounds = 10;

        // Ensure password is defined before hashing
        if (!password) {
            return res.status(400).send('Password is required.');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const group_id=1;
        // Save user to MongoDB
        const user = new User({ username, email, password: hashedPassword, mobile_no, referral, group_id });
        await user.save();
        
        // Sign JWT token
        const secretKey = process.env.JWT_SECRET; // Ensure you have a secret key in your environment variables
        jwt.sign({ user: { id: user._id, username, email } }, secretKey, { expiresIn: '300s' }, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error signing token');
            }
            console.log(token)
            res.send({  auth: token });
        });

    } catch (error) {
        console.error("Error saving user to MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
};
const signIn = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        // Find user in MongoDB by email
        const user = await User.findOne({ email:username });
       
        
        if (user) {
            // Check if the user status is active

            
                // Compare the entered password with the stored hashed password
                const passwordMatch =await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // Sign JWT token
                    // jwt.sign({ user }, secretkey, { expiresIn: '300s' }, (err, token) => {
                    //     if (err) {
                    //         console.error(err);
                    //         return res.status(500).send('Error signing token');
                    //     }
                    //     res.send({ user, auth: token });

                    const token = jwt.sign(
                        { user: { id: user._id, username: user.username } },
                        process.env.secretkey || "sarwar",
                        { expiresIn: "1h" }
                      );
                  
                      console.log("Generated Token:", token); // Debugging
                  
                      res.json({ token });
                    // });
                } else {
                    res.status(401).send('Wrong email/password. Please try again!');
                }
            
        } else {
            res.status(401).send('Wrong email/password. Please try again 2');
        }

    } catch (error) {
        console.error("Error finding user in MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Export the signUp function as default
export { signUp, signIn };
