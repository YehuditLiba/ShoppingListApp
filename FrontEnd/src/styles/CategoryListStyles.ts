import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    emptyMessage: {
        background: '#f0f9ff', 
        border: '1px solid #60a5fa', 
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        color: '#1e3a8a', 
    },
    categoryContainer: {
        background: '#f8fafc', 
        border: '1px solid #60a5fa',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(147, 197, 253, 0.3)', 
        backdropFilter: 'blur(4px)',
        transition: 'box-shadow 0.3s ease',
    },
    categoryContainerBase: {
    border: '1px solid #60a5fa',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(147, 197, 253, 0.3)',
    backdropFilter: 'blur(4px)',
    transition: 'box-shadow 0.3s ease',
},

    categoryHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        borderBottom: '1px solid #60a5fa',
        paddingBottom: '10px',
    },
    categoryIconBox: {
        padding: '10px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #e0f2fe, #dbeafe)', 
    },
    categoryTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1e3a8a', 
    },
    productList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    productItemBox: {
        marginBottom: '12px',
    },
    productItemCard: {
        background: '#f0f9ff',
        padding: '12px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeft: '4px solid #60a5fa',
        transition: 'background 0.3s ease',
        '&:hover': {
            background: '#fce7f3', 
        },
    },
}));

export default useStyles;
