function isAuth() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please sign in.' });
        }
    }
}
function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.status(400).json({ message: 'You are already signed in.' });
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        const item = req.data;
        if (req.user._id != item.author) {
            res.status(403).json({ message: 'You cannot modify this record!' });
        } else {
            next();
        }
    }
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
}