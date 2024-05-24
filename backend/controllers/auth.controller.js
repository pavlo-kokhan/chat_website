const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

const util = require("util");
const db = require("../db/connectToMySql.js");

// Преобразуем функции query в промисы
const query = util.promisify(db.query).bind(db);

const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword, gender, group, date } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${ username }`;
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${ username }`;
        const boyProfilePic = `https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg?username=${ username }`;
        const girlProfilePic = `https://t4.ftcdn.net/jpg/04/44/81/51/360_F_444815152_MuNBOsOCP45r83AZLLVnjuPHx9c6XRrw.jpg?username=${ username }`;

        // if (!boyProfilePic || !girlProfilePic) {
        //     boyProfilePic = "https://www.flaticon.com/free-icon/profile_3135715";
        // }

        const existingUser = await query("SELECT username FROM users WHERE username = ?", [ username ]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

        const insertResult = await query("INSERT INTO users SET ?", {
            username,
            password: hashedPassword,
            gender,
            group,
            date,
            profilePic
        });

        const newUser = await query("SELECT * FROM users WHERE _id = ?", [ insertResult.insertId ]);

        generateTokenAndSetCookie(newUser[0]._id, res);

        res.status(201).json({
            _id: newUser[0]._id,
            username: newUser[0].username,
            gender: newUser[0].gender,
            group: newUser[0].group,
            date: newUser[0].date,
            profilePic: newUser[0].profilePic
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const results = await query("SELECT * FROM users WHERE username = ?", [ username ]);

        if (results.length > 0) {
            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password || "");

            if (isPasswordMatch) {
                generateTokenAndSetCookie(user._id, res);

                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    gender: user.gender,
                    group: user.group,
                    date: user.date,
                    profilePic: user.profilePic
                });
            } else {
                return res.status(400).json({ error: "Invalid username or password" });
            }
        } else {
            return res.status(400).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successfully" });

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    signup,
    login,
    logout,
};