// src/styles/HeaderStyles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        background: 'linear-gradient(to right, #e0f7fa, #f0f9ff)', 
        backdropFilter: 'blur(6px)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%',
        borderBottom: '1px solid #bae6fd',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    },
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        height: '64px',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        position: 'absolute',
        right: '1.5rem',
    },
    iconBox: {
        background: 'linear-gradient(to bottom right, #f472b6, #ec4899)', 
        padding: '0.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cartIcon: {
        color: '#ffffff',
        width: '24px',
        height: '24px',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#1e3a8a', 
        letterSpacing: '-0.015em',
        textAlign: 'center',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'absolute',
        left: '1.5rem',
    },
    cartButton: {
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        borderRadius: '0.5rem',
        transition: 'background 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(186, 230, 253, 0.4)', 
        },
    },
    icon: {
        width: '24px',
        height: '24px',
        color: '#1e3a8a', 
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    badge: {
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20px',
        width: '20px',
        borderRadius: '9999px',
        background: 'linear-gradient(to right, #f472b6, #be185d)', 
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
        boxShadow: '0 0 6px rgba(0,0,0,0.2)',
        animation: '$bounce 1s infinite',
    },
    badgeInner: {
        animation: '$pulse 1.2s infinite ease-in-out',
    },
    badgePing: {
        position: 'absolute',
        top: '-1px',
        right: '-1px',
        width: '20px',
        height: '20px',
        borderRadius: '9999px',
        backgroundColor: '#f9a8d4',
        opacity: 0.3,
        animation: '$ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    },
    '@keyframes bounce': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-3px)' },
    },
    '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.6 },
    },
    '@keyframes ping': {
        '0%': { transform: 'scale(1)', opacity: 1 },
        '75%, 100%': { transform: 'scale(1.75)', opacity: 0 },
    },
}));

export default useStyles;
