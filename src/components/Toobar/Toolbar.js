// import React from 'react';
// import PropTypes from 'prop-types';

// import Input from '../UI/Input/Input';
// import Button from '../UI/Button/Button';
// import './Toolbar.scss';

// const Toolbar = ({ search, onChange, onClick, isFetching }) => {
//     return (
//         <div className="Toolbar">
//             <Input
//                 name="search"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={onChange}
//             />

//             Navigation

//             <Button 
//                 styling={ isFetching ? 'Disabled' : null }
//                 onClick={onClick}
//             >
//                 { isFetching ? 'Searching...' : 'Search' }
//             </Button>
//         </div>
//     );
// };

// Toolbar.propTypes = {
//     search: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     onClick: PropTypes.func.isRequired,
//     isFetching: PropTypes.bool
// };

// export default Toolbar;



import React from 'react';
import PropTypes from 'prop-types';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Navigation from '../Navigation/Navigation';
import './Toolbar.scss';

const Toolbar = ({ 
    logout, 
    search, 
    onChange, 
    onClick, 
    isFetching, 
    isAuthenticated 
}) => {
    
    return (
        <div className="Toolbar">
           <Input 
                placeholder="Search..."
                name="search"
                onChange={onChange}
                value={search}
           />

            <Navigation 
                isAuthenticated={isAuthenticated}
                logout={logout}
            />

            <Button 
                onClick={onClick}
                styling={ isFetching ? 'Disabled' : null }
            >
                { isFetching ? 'Searching...' : 'Search' }
            </Button>
                  
        </div>
    );
};

Toolbar.propTypes = {
    search: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Toolbar;
