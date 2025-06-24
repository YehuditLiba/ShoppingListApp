import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../configuration/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useStyles from '../styles/HeaderStyles';

const Header: React.FC = () => {
    const totalItems = useSelector((state: RootState) => state.product.totalItems);
    const classes = useStyles();

    return (
        <header className={classes.header} dir="rtl">
            <div className={classes.container}>
                <div className={classes.leftSection}>
                    <div className={classes.iconBox}>
                        <ShoppingCartIcon className={classes.cartIcon} />
                    </div>
                    <h1 className={classes.title}>  Shopping List App-
                    רשימת קניות</h1>
                </div>

                <div className={classes.rightSection}>
                    <button className={classes.cartButton}>
                        <ShoppingCartIcon className={classes.icon} />
                        {totalItems > 0 && (
                            <span className={classes.badge}>
                                <span className={classes.badgeInner}>{totalItems}</span>
                                <span className={classes.badgePing}></span>
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
