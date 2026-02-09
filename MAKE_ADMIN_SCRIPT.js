// Admin эрх өгөх скрипт
// Browser Console дээр (F12) энэ кодыг ажиллуулаарай

const email = "ujinm23@gmail.com";

console.log("🔍 Хэрэглэгч хайж байна:", email);

fetch("https://fooddelivery-back-qe16.onrender.com/api/users")
  .then((res) => res.json())
  .then((users) => {
    console.log(" Бүх хэрэглэгчид:", users);

    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log("Хэрэглэгч олдсонгүй:", email);
      console.log(
        " Бүх хэрэглэгчид:",
        users.map((u) => u.email),
      );
      return;
    }

    console.log(" Хэрэглэгч олдлоо!");
    console.log("   Email:", user.email);
    console.log("   ID:", user._id);
    console.log("   Одоогийн Role:", user.role);

    if (user.role === "admin") {
      console.log("ℹ Хэрэглэгч аль хэдийн admin эрхтэй байна");
      return;
    }

    console.log("Admin эрх өгөж байна...");

    // Admin эрх өгөх
    return fetch(
      "https://foodapp-back-k58d.onrender.com/api/users/make-admin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      },
    );
  })
  .then((res) => {
    if (!res) return;
    return res.json();
  })
  .then((data) => {
    if (data && data.success) {
      console.log(" Admin эрх амжилттай өгөгдлөө!");
      console.log(" Шинэ мэдээлэл:", data.user);
      console.log("");
      console.log(" Дараагийн алхмууд:");
      console.log("   1. Logout хийх");
      console.log("   2. Login хийх (энэ email-ээр)");
      console.log("   3. /admin page харна уу");
    } else if (data) {
      console.log(" Алдаа:", data.error || data);
    }
  })
  .catch((err) => {
    console.error(" Алдаа гарлаа:", err);
  });
