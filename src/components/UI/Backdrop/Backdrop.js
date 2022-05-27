import React from 'react';
import PropTypes from 'prop-types';

import './Backdrop.scss';

const Backdrop = ({ onClick }) => (
    <div 
        className='Backdrop' 
        onClick={onClick}
    />
);

Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Backdrop;
