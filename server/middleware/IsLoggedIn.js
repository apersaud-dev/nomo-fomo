const isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'ERROR: User does not exist'});
    }
};

module.exports = isLoggedIn;