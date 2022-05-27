import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from '../Backdrop/Backdrop';
import cssClasses from './Modal.module.scss';

const Modal = ({ showModal, closeModal, children }) => {
    // const modalClasses = [
    //     cssClasses.Modal,
    //     showModal ? cssClasses.Opened : cssClasses.Closed
    // ];
    
    return (
        <>
            <CSSTransition
                in={showModal}
                timeout={400}
                mountOnEnter
                unmountOnExit
            >
                <Backdrop onClick={closeModal} />
            </CSSTransition>

            <CSSTransition
                in={showModal}
                timeout={400}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterActive: cssClasses.Opened,
                    exitActive: cssClasses.Closed
                }}
            >
                <div className={cssClasses.Modal}>
                    {children}
                </div>
            </CSSTransition>
        </>
    );
};

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default Modal;
