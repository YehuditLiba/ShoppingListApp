using DAL.Models;
using DAL.Interfaces;
using DAL.Services;
using BL.Interfaces;
using BL.BlApi;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuration 
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("❌ Connection string is not set in any configuration source");
}
Console.WriteLine($"🔗 Connection String: {connectionString}");

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
AppContext.SetSwitch("Npgsql.DisableNetworkingIPv6", true);

// Services 
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

builder.Services.AddScoped<IProductService, BL.BlApi.ProductService>();
builder.Services.AddScoped<IProductRepository, DAL.Services.ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//  Build & Migrate 
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ShoppingListContext>();

    context.Database.Migrate();

    if (!context.Products.Any())
    {
        DAL.Seed.DbSeeder.Seed(context);
    }
}

app.Use(async (context, next) =>
{
    if (context.Request.Method == HttpMethods.Options)
    {
        context.Response.StatusCode = 200;
        await context.Response.CompleteAsync();
        return;
    }

    await next();
});

app.UseRouting();
app.UseCors("AllowAllOrigins");

app.UseSwagger();
app.UseSwaggerUI();

if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");
