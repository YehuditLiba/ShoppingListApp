 Shopping List App

תיאור כללי

אפליקציה לניהול רשימת קניות המאפשרת הוספה של מוצרים לפי קטגוריות, ספירת פריטים בסל, ושמירת ההזמנה במסד נתונים.

האפליקציה נבנתה בהתאם להנחיות מטלת הבית של אגף התקשוב ומערכות המידע של משרד הביטחון, וכוללת את כלל הדרישות שצוינו – בצד הלקוח ובצד השרת – לרבות פריסה בענן של ה־Frontend וה־Backend.

קישור למאגר הקוד (GitHub)

https://github.com/YehuditLiba/ShoppingListApp

קישור לאפליקציה בענן (Vercel + Render)

צד לקוח (Vercel): https://shopping-list-app-git-main-yehudits-projects-d6745b39.vercel.app

צד שרת (Render): https://shoppinglistapp-ol2i.onrender.com

הערה: האפליקציה מתארחת בענן בחשבונות חינמיים, ולכן ייתכנו זמני טעינה ראשוניים של כ־30–50 שניות עם חוסר תגובה זמנית.

הוראות התקנה והרצה מקומית

תנאים מוקדמים:

מותקן .NET 8 SDK

מותקן Node.js + npm

מותקן PostgreSQL או חיבור ל־Supabase (כפי שמוגדר ב־appsettings.json)

1. הרצת השרת (Backend):

cd ShoppingListApi
# ערוך את appsettings.Local.json או את משתני הסביבה בהתאם
# דוגמה להתחברות:
# "ConnectionStrings": {
#     "DefaultConnection": "Host=localhost;Port=5432;Database=shopping;Username=postgres;Password=yourpassword"
# }
dotnet run

2. הרצת הלקוח (Frontend):

cd client
npm install
npm start

משתני סביבה בפרונט:

REACT_APP_API_MODE=local
REACT_APP_API_URL_LOCAL=http://localhost:8080
REACT_APP_API_URL_PROD=https://shoppinglistapp-ol2i.onrender.com

טכנולוגיות עיקריות

Frontend:

React + TypeScript

Redux Toolkit (ניהול מצב)

Ant Design (UI)

Axios (קריאות API)

Backend:

ASP.NET Core 8.0

Entity Framework Core (ORM)

PostgreSQL

פריסה בענן:

Vercel – לפרונטאנד

Render – לבאקאנד

יכולות נוספות בפרויקט

שימוש בתבניות טיפוסיות לעבודה עם Redux

שימוש ב־Dockerfile מלא לפריסה אוטומטית בענן

Seed ראשוני לקטגוריות בעת העלאת השרת

בהצלחה, ותודה על ההזדמנות 🙏

