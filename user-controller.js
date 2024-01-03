const User = require('../model/user');
const bcrypt = require('bcrypt');


// const getAllUser = async (req, res, next) => {
//     let users;
//     try {
//         users = await User.find();
//     } catch (err) {
//         console.log(err);
//     }
//     if (!users) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     return res.status(200).json({users: users});
// }
const getAllUser = async (req, res, next) => {
    let users;
  try {
    users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err); 
  }
};


const signup = async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (existingUser) {
        res.send('User already exists!')
    }


    const saltRound = 12;
    const salt = bcrypt.genSaltSync(saltRound);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });
    
    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    res.json({user});
}


const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.json({message: 'Could not find a user by this email!'})
        }
    } catch (err) {
        return console.log(err);
    }


    const isPasswordConfirmed = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordConfirmed) {
        return res.json({message: 'Incorrect password!'})
    }
    return res.json({message: 'Login Successfull!'})
}


module.exports = { getAllUser, signup, login };
