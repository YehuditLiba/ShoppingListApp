namespace DAL.Models
{
    public class Products
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public int amount { get; set; }

        public int CategoryId { get; set; }  // 🟢 חשוב: שם לפי קונבנציה
        public Category Category { get; set; }  // 🟢 מאפשר נווט ב־EF
    }
}
