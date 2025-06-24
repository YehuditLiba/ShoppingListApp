using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace DAL.Services
{
    public class ProductService : IProductRepository
    {

        private readonly ShoppingListContext _context;

        public ProductService(ShoppingListContext context)
        {
            _context = context;
        }

        public IEnumerable<Products> GetAllproducts()
        {
            return _context.Products.Include(p=>p.Category).ToList(); 
        }

        public void AddProduct(Products product)
        {
            // ביטול שיוך של קטגוריה כדי למנוע ניסיון הכנסה כפולה
            product.Category = null;

            var existingProduct = _context.Products.FirstOrDefault(p => p.name == product.name);
            if (existingProduct != null)
            {
                existingProduct.amount += product.amount;
            }
            else
            {
                _context.Products.Add(product);
            }

            _context.SaveChanges();
        }

        public void UpdateProductAmount(int productId, int amount)
        {
            var product = _context.Products.Find(productId);
            if (product != null)
            {
                product.amount = amount; 
                _context.SaveChanges(); 
            }
        }
        public void AddProducts(List<Products> products)
        {
            foreach (var product in products)
            {
                AddProduct(product);
            }
        }

        public void DeleteProduct(int productId)
        {
            var product = _context.Products.Find(productId);
            if(product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }
        public int GetTotalItems()
        {
            return _context.Products.Sum(p => p.amount); 
        }

    }
}
