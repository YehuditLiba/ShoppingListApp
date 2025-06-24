import React from 'react';
import { Category } from '../modules/category';
import { Product } from '../modules/product';
import ProductItem from './ProductItem';
import {
    Apple,
    Croissant,
    SprayCan,
    UtensilsCrossed,
    Drumstick,
    Milk,
    Package,
    Tags,
} from 'lucide-react';
import useStyles from '../styles/CategoryListStyles';

interface CategoryListProps {
    products: Product[];
    categories: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
    'ירקות ופירות': <Apple size={24} color="#16a34a"/>,
    'מאפים': <Croissant size={24} color="#d97706" />,
    'מוצרי ניקיון': <SprayCan size={24} color="#7c3aed"/>,
    'בשר ודגים': <Drumstick size={24} color="#dc2626" />,
    'גבינות': <Milk size={24} color="#2563eb"/>,

};

const getCategoryIcon = (name: string): React.ReactNode => {
    return categoryIcons[name] || <Tags size={24} />;
};
  
const CategoryList: React.FC<CategoryListProps> = ({
    products,
    categories,
    increaseQuantity,
    decreaseQuantity,
}) => {
    const classes = useStyles();

    const categorizedProducts = categories.map((category) => ({
        ...category,
        products: products.filter((product) => product.categoryId === category.id),
    }));

    if (categorizedProducts.length === 0) {
        return (
            <div className={classes.emptyMessage}>
                <h3>הרשימה שלך ריקה</h3>
                <p>אפשר להתחיל להוסיף מוצרים לרשימת הקניות!</p>
            </div>
        );
    }

    return (
        <div dir="rtl">
            <h2 className={classes.categoryTitle}>יש לאסוף את המוצרים מהמחלקות הבאות:</h2>
            {categorizedProducts.map((category) => (
                <div key={category.id} className={classes.categoryContainer}>
                    <div className={classes.categoryHeader}>
                        <div className={classes.categoryIconBox}>
                            {getCategoryIcon(category.name)}
                        </div>
                        <h3 className={classes.categoryTitle}>{category.name}</h3>
                    </div>
                    <div className={classes.productList}>
                        {category.products.map((product) => (
                            <div key={product.id} className={classes.productItemBox}>
                                <ProductItem
                                    product={product}
                                    onIncrease={increaseQuantity}
                                    onDecrease={decreaseQuantity}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
