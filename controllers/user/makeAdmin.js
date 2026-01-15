const UserModel = require("../../schemas/userSchema");
const UserRoleEnum = require("../../utils/userRole");

const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID шаардлагатай" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { role: UserRoleEnum.ADMIN },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    res.json({
      success: true,
      message: "Хэрэглэгч admin эрхтэй болсон",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = makeAdmin;
