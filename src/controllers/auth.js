import User from '../models/user';
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, avatar } = req.body; 
        const exitsUser = await User.findOne({email}).exec();
        if (exitsUser) {
            res.json({
                message: "Email đã tồn tại vui lòng đăng ký email khác"
            })
        }
        
        const user = await new User({firstName, lastName, email, password, avatar}).save();
        res.json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar
            }
        })
    } catch (error) {
        res.status(404).json({
            message: "Không tạo được tài khoản"
        })
    }
}
export const signin = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email}).exec();
    if (!user) {
        res.json({
            message: "User không tồn tại"
        })
    }
    if (!user.authenticate(password)) {
        res.json({
            message: "Mật khẩu không đúng"
        })
    }
    res.json({
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatar: user.avatar
        }
    })
}
