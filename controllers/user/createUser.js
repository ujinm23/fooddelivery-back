const UserModel = require("../../schemas/userSchema");

const createUser = async (req, res) => {
  try {
    const { firstName, email, password, address, phoneNumber } = req.body;

    const data = await UserModel.create({
      firstName,
      email,
      password,
      address,
      phoneNumber,
    });

    res.json({
      message: "User created successfully!",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = createUser;
