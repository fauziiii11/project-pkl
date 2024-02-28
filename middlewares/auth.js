const jwt = require("jsonwebtoken");
const model = require("../database/models");
require("dotenv").config();

module.exports = (req, res, next) => {
    let token = req.headers.token;
    if(token){
        let verify = jwt.verify(token, process.env.JWT_KEY_SECRET);

        model.User.findOne({
            where: {
                id: verify.id,
            },
        }).then(function (result){
            if (result){
                req.decode = verify;
                next();
            }else{
                res.status(401).json({
                    message: "Kamu tidak punya akses",
                });
            }
        }).catch(function(error){
            res.json({error:error});
        });
    }else{
        res.status(401).json({
            message: "Silahkan Login terlebih dahulu",
        })
    }
}