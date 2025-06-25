using DAL.Models;
using DAL.Interfaces;
using DAL.Services;
using BL.Interfaces;
using BL.BlApi;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// === Load Configuration ===
builder.Configuration.AddJsonFile("appsettings.Local.json", optional: false, reloadOnChange: true);
Console.WriteLine("✅ Loaded appsettings.Local");

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("❌ Connection string is not set in appsettings.Local.json");
}
Console.WriteLine($"🔗 Connection String: {connectionString}");

// === Register Services ===
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<ShoppingListContext>(options =>
    options.UseNpgsql(connectionString));

// Dependency Injection - Services and Repositories
builder.Services.AddScoped<IProductService, BL.BlApi.ProductService>();      // BL layer
builder.Services.AddScoped<IProductRepository, DAL.Services.ProductService>(); // DAL layer
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// === Database Migration + Seeding ===
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ShoppingListContext>();

    // Apply migrations (safe to run always)
    context.Database.Migrate();

    // Seed once (only if relevant)
    DAL.Seed.DbSeeder.Seed(context);
}

// === Middleware Pipeline ===
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🚨 UseCors BEFORE HttpsRedirection
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();
