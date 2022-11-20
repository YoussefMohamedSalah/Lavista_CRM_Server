import JWT from "jsonwebtoken";

const checkAuth = async (req: any, res: any, next: any) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(400).json({
            errors: [
                {
                    msg: "NO Token Found",
                },
            ],
        });
    }
    // Authorization: `Bearer ${token}`
    try {
        const user: any = await JWT.verify(
            token,
            "876asdn3oks@d,9ked(76rdndiousdlws%4fdp'wxsy"
        );
        req.user = user.loggin;
        next();
    } catch (error) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Token Invalid",
                },
            ],
        });
    }
};

export { checkAuth };
