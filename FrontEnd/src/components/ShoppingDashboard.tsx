import React, { useState, useEffect, useRef } from 'react';
import { Container, CircularProgress, Snackbar } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';
import { Product } from '../modules/product';
import { Category } from '../modules/category';
import { setProducts, increaseQuantity, decreaseQuantity, resetCart } from '../modules/productSlice';
import { setCategories } from '../modules/categorySlice';
import { RootState } from '../configuration/store';

const ShoppingDashboard: React.FC = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.products);
    const [categories, setCategoriesState] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ productName: '', category: '' });
    const firstLoadDone = useRef(false);

    const saveProductsToLocalStorage = (products: Product[]) => {
        if (products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        } else {
            localStorage.removeItem('products');
        }
    };

    const loadProductsFromLocalStorage = (): Product[] => {
        try {
            const storedProducts = localStorage.getItem('products');
            if (!storedProducts) return [];

            const rawProducts: any[] = JSON.parse(storedProducts);
            const normalizedProducts: Product[] = rawProducts
                .map((product: any): Product | null => {
                    const categoryId =
                        product.categoryId ?? product.categoryid ?? product.category?.id;

                    if (
                        typeof product.name !== 'string' ||
                        typeof product.amount !== 'number' ||
                        typeof categoryId !== 'number' ||
                        product.amount <= 0
                    ) {
                        console.warn('❌ מוצר לא תקין הוסר:', product);
                        return null;
                    }

                    return {
                        id: product.id,
                        name: product.name,
                        amount: product.amount,
                        categoryId: categoryId,
                    };
                })
                .filter((p): p is Product => p !== null);

            return normalizedProducts;
        } catch (error) {
            console.error('❌ שגיאה בטעינת מוצרים מה־localStorage:', error);
            return [];
        }
    };

    const fetchCategories = async (): Promise<void> => {
        setLoading(true);
        try {
            const response: AxiosResponse<Category[]> = await axios.get(`${process.env.REACT_APP_API_URL}/api/Category`);
            setCategoriesState(response.data);
            dispatch(setCategories(response.data));
            console.log('Categories fetched:', response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setSnackbarMessage('שגיאה בטעינת קטגוריות.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsFromApi = async (): Promise<void> => {
        try {
            console.log('🌐 מבצע קריאת מוצרים מהשרת...');
            const response: AxiosResponse<Product[]> = await axios.get(`${process.env.REACT_APP_API_URL}/api/Category`);
            const productsFromApi: Product[] = response.data.filter(product => product.amount > 0 && product.name);
            dispatch(setProducts(productsFromApi));
         //   saveProductsToLocalStorage(productsFromApi);
            console.log('🧠 נשמרו ב־Redux ו־localStorage:', productsFromApi);
        } catch (error) {
            console.error('❌ שגיאה בשליפת מוצרים מהשרת:', error);
            setSnackbarMessage('שגיאה בטעינת מוצרים.');
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        const initProducts = async () => {
            const hasLoaded = localStorage.getItem('hasLoadedFromServer') === 'true';

            if (!hasLoaded) {
                console.log('🌐 טעינה ראשונה מהשרת');
                await fetchProductsFromApi();
                localStorage.setItem('hasLoadedFromServer', 'true');
            } else {
                console.log('📦 טעינה מלוקאל סטורג');
                const localProducts = loadProductsFromLocalStorage();
                dispatch(setProducts(localProducts));
            }
        };

        initProducts();
        fetchCategories(); 
    }, [dispatch]);
    

    const handleAddProduct = (product: { name: string; categoryId: string; amount: number }) => {
        let error = { productName: '', category: '' };

        if (!product.name) error.productName = 'יש להזין שם מוצר';
        if (!product.categoryId) error.category = 'יש לבחור קטגוריה';

        setErrors(error);
        if (error.productName || error.category) return;

        const newProduct: Product = {
            id: Date.now(),
            name: product.name,
            categoryId: Number(product.categoryId),
            amount: product.amount
        };

        const existingProductIndex = products.findIndex(p => p.name === newProduct.name && p.categoryId === newProduct.categoryId);
        const updatedProducts = [...products];
        if (existingProductIndex >= 0) {
            const updatedProduct = {
                ...updatedProducts[existingProductIndex],
                amount: updatedProducts[existingProductIndex].amount + newProduct.amount,
            };
            updatedProducts[existingProductIndex] = updatedProduct;
        } else {
            updatedProducts.push(newProduct);
        }
        

        dispatch(setProducts(updatedProducts));
        saveProductsToLocalStorage(updatedProducts);
        dispatch(increaseQuantity(newProduct.amount));
    };

    const handleDownloadOrder = () => {
        const data = products.map(product => `${product.name}: ${product.amount}`).join('\n');
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const file = document.createElement('a');
        file.href = url;
        file.download = 'order.txt';
        document.body.appendChild(file);
        file.click();
        document.body.removeChild(file);
        URL.revokeObjectURL(url);

        setSnackbarMessage('🤗ההזמנה הועתקה בהצלחה');
        setOpenSnackbar(true);
    };

    const handleConfirmOrder = async () => {
        if (products.length === 0) {
            setSnackbarMessage('😳 אין מוצרים ברשימה כדי לבצע הזמנה');
            setOpenSnackbar(true);
            return;
        }

        const validProducts = products
            .filter(p =>
                typeof p.name === 'string' &&
                typeof p.amount === 'number' &&
                typeof p.categoryId === 'number' &&
                p.amount > 0 &&
                p.name.trim().length > 0
            )
            .map(p => {
                const category = categories.find(c => c.id === p.categoryId);
                return {
                    id: 0, // השרת מתעלם מזה בפועל
                    name: p.name,
                    amount: p.amount,
                    categoryId: p.categoryId,
                    category: {
                        id: category?.id ?? 0,
                        name: category?.name ?? ''
                    }
                };
            });

        if (validProducts.length === 0) {
            setSnackbarMessage('אין מוצרים תקינים להזמנה.');
            setOpenSnackbar(true);
            return;
        }

        console.log('🛒 נשלח להזמנה:', validProducts);

        try {
            await axios.post(
                'http://localhost:5201/api/Product/confirm-order',
                validProducts,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSnackbarMessage('ההזמנה בוצעה בהצלחה! 🎉');
            setOpenSnackbar(true);
            dispatch(resetCart());
            localStorage.removeItem('products');
        } catch (error: unknown) {
            console.error('❌ Error saving order:', error);

            if (axios.isAxiosError(error)) {
                const responseError = error.response?.data;
                let errorMessage = `שגיאה: ${responseError?.message || 'שגיאה לא ידועה.'}`;
                if (responseError && responseError.errors) {
                    errorMessage += ' שגיאות: ';
                    Object.keys(responseError.errors).forEach(key => {
                        errorMessage += `${key}: ${responseError.errors[key].join(', ')}. `;
                    });
                }
                setSnackbarMessage(errorMessage);
            } else {
                setSnackbarMessage('שגיאה בלתי צפויה התרחשה.');
            }

            setOpenSnackbar(true);
        }
    };
    
    

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSetProducts: React.Dispatch<React.SetStateAction<Product[]>> = (value) => {
        const newProducts = typeof value === 'function' ? value(products) : value;
        dispatch(setProducts(newProducts));
    };

    return (
        <Container>
            <Header />
            <CategoryInput
                onAddProduct={handleAddProduct}
                categories={categories}
                errors={errors}
                onDownloadOrder={handleDownloadOrder}
                onConfirmOrder={handleConfirmOrder}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <CategoryList
                    products={products}
                    categories={categories}
                    setProducts={handleSetProducts}
                    increaseQuantity={(id: number) => {
                        const updated = products.map(product =>
                            product.id === id
                                ? { ...product, amount: product.amount + 1 }
                                : product
                        );
                        dispatch(increaseQuantity(id));
                        saveProductsToLocalStorage(updated);
                    }}
                    decreaseQuantity={(id: number) => {
                        const updated = products.map(product =>
                            product.id === id
                                ? { ...product, amount: Math.max(0, product.amount - 1) }
                                : product
                        );
                        dispatch(decreaseQuantity(id));
                        saveProductsToLocalStorage(updated);
                    }}
                />
            )}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default ShoppingDashboard;
