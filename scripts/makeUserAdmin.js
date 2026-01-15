const connectToDB = require("../db");
const UserModel = require("../schemas/userSchema");
const UserRoleEnum = require("../utils/userRole");

const makeUserAdmin = async () => {
  try {
    // Database холбогдох
    await connectToDB();
    console.log("✅ Database холбогдлоо");

    // Хэрэглэгч олох (email эсвэл firstName-ээр)
    const searchTerm = "Enkhee123";
    const user = await UserModel.findOne({
      $or: [
        { email: { $regex: searchTerm, $options: "i" } },
        { firstName: { $regex: searchTerm, $options: "i" } }
      ]
    });

    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй:", searchTerm);
      console.log("💡 Бүх хэрэглэгчдийн жагсаалт:");
      const allUsers = await UserModel.find({}, "email firstName role");
      allUsers.forEach(u => {
        console.log(`   - ${u.email} (${u.firstName}) - Role: ${u.role}`);
      });
      process.exit(1);
    }

    console.log("🔍 Хэрэглэгч олдлоо:");
    console.log(`   Email: ${user.email}`);
    console.log(`   First Name: ${user.firstName}`);
    console.log(`   Одоогийн Role: ${user.role}`);

    if (user.role === UserRoleEnum.ADMIN) {
      console.log("ℹ️ Хэрэглэгч аль хэдийн admin эрхтэй байна");
      process.exit(0);
    }

    // Admin эрх өгөх
    user.role = UserRoleEnum.ADMIN;
    await user.save();

    console.log("✅ Admin эрх амжилттай өгөгдлөө!");
    console.log(`   Шинэ Role: ${user.role}`);
    console.log("");
    console.log("📌 Дараагийн алхмууд:");
    console.log("   1. Хэрэглэгч logout/login хийх шаардлагатай");
    console.log("   2. Дараа нь /admin page харна уу");

    process.exit(0);
  } catch (err) {
    console.error("❌ Алдаа гарлаа:", err);
    process.exit(1);
  }
};

// Скрипт ажиллуулах
makeUserAdmin();
