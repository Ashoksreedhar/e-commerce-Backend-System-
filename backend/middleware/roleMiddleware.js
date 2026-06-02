export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.json({ error: "Access denied" });
        }
        next()
    }
}