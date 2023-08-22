const User = require('../model/UserSchema');
const bcrypt=require('bcryptjs');


const getAllUser = async (req, resp, next) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return resp.status(404).json({ message: "No user found!" });
        }

        return resp.status(202).json({ users });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const signup = async (req, resp) => {
    const { name, email, password } = req.body;

    try {
        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return resp.status(400).json({ message: "User already exists. Please log in instead." });
        }

        // Create a new user and save to the database
        const hashedPassword=bcrypt.hashSync(password);
        
        const newUser = new User({ name, email, password:hashedPassword,blogs:[] });

        await newUser.save();

        return resp.status(201).json({ user: newUser });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "User registration failed." });
    }
};


const login=async(req,resp)=>{
     
    const{email,password}=req.body;

    let existingUser;
    try {
        existingUser= await User.findOne({email});

    } catch (error) {
        console.log(error);
    }
     
    if(!existingUser){
        return resp.status(404).json({message:"couldn't find the user"})
    }
    

    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return resp.status(400).json({message:"Incorrect Password"});

    }

    return resp.status(200).json({message:"Login successfull"});



}

module.exports = {getAllUser,signup,login};
