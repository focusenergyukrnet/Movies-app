import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navigation.scss';

const routes = [
    {
        path: '/',
        exact: true,
        title: 'Home'
    },
    {
        path: '/favorite',
        title: 'Favorite'
    },
    {
        path: '/auth',
        title: 'Auth'
    },
    {
        path: '/logout',
        title: 'Logout'
    },
];

const Navigation = ({ isAuthenticated, logout }) => (
    <nav className="Navigation">
        <ul>
            {routes.map(({ path, exact, title }, i) => {
                if (isAuthenticated && path === '/auth') return null;
                if (!isAuthenticated && path !== '/auth') return null;

                let icon;

                switch (path) {
                    case '/': icon = 'fa-home'; break;
                    case '/favorite': icon = 'fa-star'; break;
                    case '/logout': icon = 'fa-sign-out-alt'; break;
                    default: break;
                }

                if (isAuthenticated && path === '/logout') {
                    return (
                        <li 
                            onClick={logout}
                            key={path + i} 
                        >
                            <i className={`fas ${icon}`}/>
                            <span>{title}</span>
                        </li>
                    );
                }
                
                return (
                    <li key={path + i} >
                        <NavLink 
                            to={path} 
                            exact={exact}
                            activeClassName='Active'
                        >
                            <i className={`fas ${icon}`}/>
                            <span>{title}</span>
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    </nav>
);

Navigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default Navigation;
