import { useEffect } from 'react';

export function Modal({closeModal, image}) {
    const closeCallback = (event) => {
        if (event.key === 'Escape' || event.currentTarget === event.target) {
                closeModal();
        }
        window.removeEventListener('keydown', closeCallback)
    }

    useEffect(() => {
        window.addEventListener('keydown', closeCallback)
    }, [])
        
    return <div className="Overlay" onClick={closeCallback} >
        <div className="Modal">
            <img src={image} alt={image} />
        </div>
    </div>
}
