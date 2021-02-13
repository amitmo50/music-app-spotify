import React from 'react';

import './Modal.css';

const Modal = ({children, show, close}) => {
    console.log('render Modal');

    if(!show) return null

    return(
        <div className="Modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={close}></i>
                {children}
            </div>
        </div>
    )
}

export default Modal;