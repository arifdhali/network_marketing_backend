const AuthRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user)
        if (!req.user || !roles.includes(req.user?.type)) {
            return res.status(403).json({
                status: false,
                message: "Access denied for this role!"
            })
        }
        next();
    }
}

export default AuthRoles;