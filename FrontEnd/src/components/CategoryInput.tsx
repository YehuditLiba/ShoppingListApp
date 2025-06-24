import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { Category } from '../modules/category';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CategoryInputProps {
    onAddProduct: (product: { name: string; categoryId: string; amount: number }) => void;
    categories: Category[];
    errors: { productName: string; category: string };
    onDownloadOrder: () => void;
    onConfirmOrder: () => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onAddProduct,
    categories,
    errors,
    onDownloadOrder,
    onConfirmOrder,
}) => {
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [nameError, setNameError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameError) return;

        onAddProduct({ name: productName, categoryId: selectedCategory, amount: 1 });
        setProductName('');
        setSelectedCategory('');
        setNameError('');
    };

    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Zא-ת\s]*$/.test(value) || value === '') {
            setProductName(value);
            setNameError('');
        } else {
            setNameError('נא להזין רק אותיות');
        }
    };

    return (
        <Container fluid className="p-3">
            <Row className="align-items-center mb-3">
                <Col xs={12} md={8} className="d-flex justify-content-start mb-2 mb-md-0">
                    <TextField
    label="שם מוצר"
    value={productName}
    onChange={handleProductNameChange}
    error={!!nameError || !!errors.productName}
    helperText={nameError || errors.productName}
    sx={{
        width: '180px',
        marginInlineEnd: '5px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontWeight: 'bold',
            height: '56px',
            '& fieldset': {
                borderColor: '#60a5fa',
            },
            '&:hover fieldset': {
                borderColor: '#3b82f6',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2563eb',
            },
            '& input': {
                padding: '12px',
                color: '#1e40af',
            },
        },
    }}
/>

<FormControl sx={{ minWidth: '180px', marginInlineEnd: '8px' }}>
    <InputLabel sx={{ backgroundColor: 'white', paddingX: '4px' }}>בחר קטגוריה</InputLabel>
    <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        error={!!errors.category}
        sx={{
            color: '#1e40af',
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#60a5fa',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2563eb',
            },
        }}
    >
        <MenuItem value="" disabled></MenuItem>
        {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
                {category.name}
            </MenuItem>
        ))}
    </Select>
    <Box color="error.main" fontSize="0.8rem">
        {errors.category}
    </Box>
</FormControl>

<Button
    variant="outlined"
    onClick={handleSubmit}
    sx={{
        color: '#2563eb',
        borderRadius: '8px',
        fontWeight: 'bold',
        paddingInline: '16px',
        height: '56px',
        border: '2px solid #60a5fa',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#f0f9ff',
            borderColor: '#3b82f6',
        },
    }}
>
    הוסף מוצר
</Button>
                </Col>

                <Col
                    xs={12}
                    md={4}
                    className="d-flex justify-content-start justify-content-md-end flex-wrap gap-2 mt-2 mt-md-0"
                >
                    <Button
                        variant="outlined"
                        onClick={onConfirmOrder}
                        startIcon={<CheckCircleIcon />}
                        sx={{
                            border: '2px solid #3b82f6',
                            color: '#1e3a8a',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            height: '40px',
                            paddingInline: '12px',
                            backgroundColor: '#e0f2fe',
                            '&:hover': {
                                backgroundColor: '#dbeafe',
                            },
                        }}
                    >
                        אישור הזמנה
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onDownloadOrder}
                        startIcon={<DownloadIcon />}
                        sx={{
                            border: '2px solid #6366f1',
                            color: '#3730a3',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            height: '40px',
                            paddingInline: '12px',
                            backgroundColor: '#f0f9ff',
                            '&:hover': {
                                backgroundColor: '#e0e7ff',
                            },
                        }}
                    >
                        הורד טופס
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CategoryInput;
