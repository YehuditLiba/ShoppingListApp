## ✨ Shopping List App ✨

ניהול רשימת קניות דיגיטלית עם Frontend + Backend מודרניים, מבוססי ענן.

---

### 🎯 מטרת הפרויקט
אפליקציית Shopping List מאפשרת ניהול נוח של קניות עם הוספת פריטים לפי קטגוריה, ספירת פריטים בסל ואישור הזמנה – הנשמרת במסד נתונים.

> הפרויקט פותח לפי דרישות אגף התקשוב של משרד הביטחון, כולל פריסה בענן של הצד הלקוח והשרת.

---

### 🔗 קישורים חשובים
- [GitHub Repository](https://github.com/YehuditLiba/ShoppingListApp)
- 🌐 [Frontend (Vercel)](https://shopping-list-app-git-main-yehudits-projects-d6745b39.vercel.app)
- ⚙️ [Backend (Render)](https://shoppinglistapp-ol2i.onrender.com)

> ⏱️ האפליקציה מתארחת בענן (חינם) ולכן ייתכן עיכוב של 30–50 שניות בעת טעינה ראשונית.

---

### 💻 התקנה והרצה מקומית

#### דרישות מוקדמות:
- Node.js + npm מותקנים
- .NET 8 SDK מותקן
- מסד נתונים PostgreSQL או Supabase פעיל

#### 🚀 הרצת ה־Backend:
```bash
cd ShoppingListApi
# ערוך appsettings.Local.json עם connection string מתאים
# דוגמה:
# "ConnectionStrings": {
#   "DefaultConnection": "Host=localhost;Port=5432;Database=shopping;Username=postgres;Password=yourpassword"
# }
dotnet run

