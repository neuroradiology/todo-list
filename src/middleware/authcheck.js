const jwt = require('jsonwebtoken');
const jwtkey = <INSERT JSON WEB TOKEN SECRET KEY>;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtkey);
        next();
    } catch (error) {
        res.json({
        	"message":"Unauthorized Access."
        });
    }
};




