import { makeStyles } from '@mui/styles';

const useProductItemStyles = makeStyles(() => ({
    productRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: '#fff1f2',
        borderRadius: '8px',
        //borderLeft: '4px solid #f9a8d4',
        transition: 'background 0.3s ease',
        '&:hover': {
            backgroundColor: '#ffe4e6',
        },
    },
    productName: {
        fontWeight: 'bold',
        color: '#be123c',
        flexGrow: 1,
        textAlign: 'right',
        paddingInlineEnd: '10px',
    },
    quantityBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    button: {
        minWidth: '28px',
        height: '28px',
        borderRadius: '9999px',
        color: '#be123c',
        borderColor: '#fbcfe8',
        '&:hover': {
     //       backgroundColor: '#fbcfe8',
        },
    },
    quantityText: {
        fontWeight: 'bold',
        fontSize: '1rem',
        width: '24px',
        textAlign: 'center',
        color: '#be123c',
    },
}));

export default useProductItemStyles;
