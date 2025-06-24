using DAL.Models;

namespace DAL.Seed
{
    public static class DbSeeder
    {
        public static void Seed(ShoppingListContext context)
        {
            context.Database.EnsureCreated(); 

            var categoriesToSeed = new List<Category>
            {
                new Category { name = "מוצרי ניקיון" },
                new Category { name = "גבינות" },
                new Category { name = "ירקות ופירות" },
                new Category { name = "בשר ודגים" },
                new Category { name = "מאפים" }
            };

            foreach (var category in categoriesToSeed)
            {
                if (!context.Categories.Any(c => c.name == category.name))
                {
                    context.Categories.Add(category);
                }
            }

            context.SaveChanges();

            var categoryNekayon = context.Categories.FirstOrDefault(c => c.name == "מוצרי ניקיון");
            var categoryGevinot = context.Categories.FirstOrDefault(c => c.name == "גבינות");

            if (categoryNekayon != null && categoryGevinot != null)
            {
                var productsToSeed = new List<Products>
                {
                    new Products { name = "חלב 3%", amount = 2, CategoryId = categoryGevinot.id },
                    new Products { name = "סבון כלים", amount = 1, CategoryId = categoryNekayon.id }
                };

                foreach (var product in productsToSeed)
                {
                    bool alreadyExists = context.Products.Any(p =>
                        p.name == product.name && p.CategoryId == product.CategoryId);

                    if (!alreadyExists)
                    {
                        context.Products.Add(product);
                    }
                }

                context.SaveChanges();
            }
        }
    }
}
