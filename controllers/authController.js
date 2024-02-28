const model = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { Model } = require("sequelize");
require("dotenv").config();

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    model.User.findOne({
        where: {
            email: email,
        }
    }).then(function (result){
        let passwordHas = result.password;
        let chekPassword = bcrypt.compareSync(password, passwordHas);

        if(chekPassword){
            res.json({
                message: "Berhasil Login",
                token: jwt.sign({  id: result.id }, process.env.JWT_KEY_SECRET, {
                    expiresIn: '1h'
                }),
                user: {
                    result
                }
            });
        }else{
            res.json({
                message : "Gagal Login",
            });
        }
    }).catch(function (error){
        res.json({error: error,
        });
    })
}

function register(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    model.User.findOne({
        where: {
            email: email,
        },
    }).then(function (result){
        if(result){
            res.json({
                message: "Email Sudah Telah Di Terdaftar, Gunakan email lain ",
            });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);

            model.User.create({
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            }).then(function (newUser){
                res.json({
                    message: "Registrasi Berhasil",
                    nama: newUser.name,
                    email: newUser.email,
                    token: jwt.sign({id: newUser.id}, process.env.JWT_KEY_SECRET,{
                        expiresIn: '1h'
                    }),
                });
            }).catch(function (error){
                res.json({error: error}); 
            });
        }
    }).catch(function (error){
        res.json({error: error});  
    });
}

function logout(req, res){
    res.json({
        message: "Logout Succesful",
    });
}

module.exports = {
    login,
    register,
    logout
}