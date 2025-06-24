import React from 'react';
import { Product } from '../modules/product';
import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useProductItemStyles from '../styles/ProductItemStyles';

interface ProductItemProps {
    product: Product;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onIncrease, onDecrease }) => {
    const classes = useProductItemStyles();

    return (
        <Box className={classes.productRow}>
            <Typography className={classes.productName}>
                {product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
            </Typography>

            <Box className={classes.quantityBox}>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={() => onDecrease(product.id)}
                    disabled={product.amount <= 0}
                >
                    <RemoveIcon fontSize="small" />
                </Button>

                <Typography className={classes.quantityText}>
                    {product.amount}
                </Typography>

                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={() => onIncrease(product.id)}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Box>
        </Box>
    );
};

export default ProductItem;
