import { nanoid } from 'nanoid';

export const ImageGalleryItem = ({ images, openModal }) => {
    return images.map(image => {
        return <li key={nanoid()} className="ImageGalleryItem">
            <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image" onClick={() => { openModal(image) }} />
    </li>
    })
}