# ✨ Shopping List App - Production Guide ✨

אפליקציית Shopping List היא אפליקציה לניהול קניות, הכוללת ממשק נוח להוספת פריטים לפי קטגוריות, ספירת פריטים בסל, ואישור הזמנה הנשמרת במסד נתונים.

הפרויקט פותח לפי דרישות, וכולל:
- פריסה מלאה בענן (Frontend + Backend)
- שימוש בטכנולוגיות מודרניות בצד לקוח ושרת
- מימוש כל הדרישות הפונקציונליות.

---

##  קישורים חשובים

- [ GitHub Repository](https://github.com/YehuditLiba/ShoppingListApp)
-  [Frontend (Vercel)](https://shopping-list-app-git-main-yehudits-projects-d6745b39.vercel.app)
-  [Backend (Render)](https://shoppinglistapp-ol2i.onrender.com)
<p align="center">
  <img src="https://github.com/YehuditLiba/ShoppingListApp/blob/main/demo.gif?raw=true" alt="Demo GIF" style="border-radius: 12px; max-width: 90%;">
</p>

>  שים לב: עקב שימוש בחשבונות חינמיים של Vercel ו־Render – ייתכנו זמני טעינה של עד 50 שניות בהרצה ראשונית.

---

##  התקנה והרצה מקומית

###  דרישות מוקדמות

- Node.js + npm מותקנים
- .NET 8 SDK מותקן
- מסד PostgreSQL פעיל או Supabase

---

###  הרצת Backend

```bash
cd ShoppingListApi
# עריכת connection string בקובץ appsettings.Local.json:

# "ConnectionStrings": {
#   "DefaultConnection": "Host=localhost;Port=5432;Database=shopping;Username=postgres;Password=yourpassword"
# }

dotnet run
 הרצת Frontend

cd client
npm install
npm start

 משתני סביבה (client/.env):

REACT_APP_API_MODE=local
REACT_APP_API_URL_LOCAL=http://localhost:8080
REACT_APP_API_URL_PROD=https://shoppinglis

טכנולוגיות עיקריות
 Frontend
React + TypeScript

Redux Toolkit לניהול state

Ant Design לספריית ממשק משתמש

Axios לקריאות HTTP

 Backend
ASP.NET Core 8

Entity Framework Core

PostgreSQL

 פריסה בענן
Vercel (Frontend)

Render (Backend)

 יכולות נוספות
 שימוש בתבניות Redux מתקדמות

 שימוש ב־Dockerfile לפריסה חיצונית

 DbSeeder להזנת קטגוריות ראשוניות

 טיפול מלא בבקשות OPTIONS ו־CORS

