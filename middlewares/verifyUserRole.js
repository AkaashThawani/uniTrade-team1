// enforces authorized access to prtected routes

function verifyUserRole(req, res, next) {
    if (req.profile.role === 'user') { 
        return res.status(403).json({
            error: 'Admin resource, Access denied',
        });
    }
    next(); 
}

module.exports = verifyUserRole;