import React, {useEffect} from 'react';

import './Toast.css';


const Toast = ({toast, close}) => {
    console.log('render Toast');
    useEffect(() => {
        if(!toast) return

        const closeToast = () => {
            setTimeout(() => {
                close()
            }, 2500);
        }

        closeToast();

        return () => {
            clearTimeout(closeToast);
        }
    }, [toast, close])
    if(!toast) return null
    return (
        <div className="toast">
            {toast}
        </div>
    )

}

export default Toast;