# Production Server дээр Deploy хийх заавар

## Асуудал
Backend код зассан ч production server (`https://foodapp-back-k58d.onrender.com`) дээр шинэчлэгдээгүй байна.

## Шийдэл

### Арга 1: Render.com дээр Manual Deploy

1. **Render.com dashboard нээх**
   - https://dashboard.render.com/ руу орох
   - `foodapp-back` service олох

2. **Manual Deploy хийх**
   - Service дээр орох
   - "Manual Deploy" button дарна
   - "Deploy latest commit" сонгоно

3. **Deploy хүлээх**
   - Deploy хийгдэх хүртэл хүлээнэ (2-5 минут)
   - "Live" status гарвал амжилттай

### Арга 2: GitHub руу Push хийх (Auto Deploy)

Хэрэв Render.com дээр auto-deploy идэвхжсэн бол:

1. **Git status шалгах**
   ```bash
   cd C:\Users\Admin\food-app\foodapp-back
   git status
   ```

2. **Changes commit хийх**
   ```bash
   git add .
   git commit -m "Fix: Add role field to login/signup response"
   ```

3. **GitHub руу push хийх**
   ```bash
   git push origin main
   ```

4. **Render.com дээр auto-deploy хийгдэнэ**
   - Dashboard дээр deploy status харагдана

### Арга 3: Local дээр Test хийх (Хурдан)

1. **Backend server ажиллуулах**
   ```bash
   cd C:\Users\Admin\food-app\foodapp-back
   npm start
   ```

2. **Frontend-ийг local backend руу чиглүүлэх**
   - `step3.js` файлд: `http://localhost:999/api/auth/login` ашиглах
   - Эсвэл environment variable ашиглах

## Шалгах

Deploy хийсний дараа:

1. **Browser дээр:**
   - Logout хийх
   - Login хийх (`enkhee123@gmail.com`)

2. **Console дээр шалгах:**
   ```javascript
   // Role: admin гэж харагдах ёстой
   ```

3. **Admin Panel харах:**
   - User icon дээр дарна
   - "Admin Panel" button харагдах ёстой

## Анхаарах зүйл

- Production server дээр deploy хийсний дараа 2-5 минут хүлээх хэрэгтэй
- Deploy хийгдэхэд server restart хийгдэнэ
- Хэрэв асуудал байвал Render.com logs шалгах
