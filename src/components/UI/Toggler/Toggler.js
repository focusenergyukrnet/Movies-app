import React from 'react';
import PropTypes from 'prop-types';

import './Toggler.scss';

const Toggler = ({ openSidedrawer }) => (
    <div className='Toggler' onClick={openSidedrawer}>
        <i className='fas fa-align-justify' />
    </div>
);

Toggler.propTypes = {
    openSidedrawer: PropTypes.func.isRequired
};

export default Toggler;
