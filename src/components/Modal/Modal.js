import { useEffect } from 'react';

export function Modal({closeModal, image}) {
   
    const handleClick =(event)=>{
    
    if(event.currentTarget === event.target){ closeModal();}

    useEffect(() => {
       const closeCallback = (event) => {
        if (event.key === 'Escape') {
                closeModal();
        }
        
    }
      
        window.addEventListener('keydown', closeCallback)
      
      return ()=> window.removeEventListener('keydown', closeCallback)
    }, [closeModal])
        
    return <div className="Overlay" onClick={handleClick} >
        <div className="Modal">
            <img src={image} alt={image} />
        </div>
    </div>
}
