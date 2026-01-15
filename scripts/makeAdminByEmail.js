const connectToDB = require("../db");
const UserModel = require("../schemas/userSchema");
const UserRoleEnum = require("../utils/userRole");

// Command line argument-аас email авах
const email = process.argv[2];

if (!email) {
  console.log("❌ Email оруулах шаардлагатай!");
  console.log("");
  console.log("Хэрэглээ:");
  console.log("  node scripts/makeAdminByEmail.js user@example.com");
  console.log("");
  console.log("Жишээ:");
  console.log("  node scripts/makeAdminByEmail.js john@gmail.com");
  process.exit(1);
}

const makeUserAdmin = async () => {
  try {
    // Database холбогдох
    await connectToDB();
    console.log("✅ Database холбогдлоо\n");

    // Email-ээр хэрэглэгч олох
    const user = await UserModel.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй:", email);
      console.log("");
      console.log("💡 Бүх хэрэглэгчдийн жагсаалт:");
      const allUsers = await UserModel.find({}, "email firstName role");
      if (allUsers.length === 0) {
        console.log("   Хэрэглэгч олдсонгүй");
      } else {
        allUsers.forEach(u => {
          console.log(`   - ${u.email} (${u.firstName || "N/A"}) - Role: ${u.role}`);
        });
      }
      process.exit(1);
    }

    console.log("🔍 Хэрэглэгч олдлоо:");
    console.log(`   Email: ${user.email}`);
    console.log(`   First Name: ${user.firstName || "N/A"}`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Одоогийн Role: ${user.role}`);
    console.log("");

    if (user.role === UserRoleEnum.ADMIN) {
      console.log("ℹ️ Хэрэглэгч аль хэдийн admin эрхтэй байна");
      process.exit(0);
    }

    // Admin эрх өгөх
    console.log("🔄 Admin эрх өгөж байна...");
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
