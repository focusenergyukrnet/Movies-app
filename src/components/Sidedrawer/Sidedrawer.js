import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import './Sidedrawer.scss';

const Sidedrawer = ({ isAuthenticated, logout }) => {
    return (
        <div className="Sidedrawer">
            <h1 className='SidedrawerTitle'>Movies App</h1>
            <Navigation
                isAuthenticated={isAuthenticated}
                logout={logout}
            />
        </div>
    );
};

Sidedrawer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default Sidedrawer;
