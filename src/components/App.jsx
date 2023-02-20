import { useState, useEffect } from 'react';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Service/Fetch'

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true)
      try {
        fetchImages(query, page).then(response => {
          setImages([...images, ...response.data.hits])
          setTotal(response.data.total)
        })
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
  }, [query, page])

  const onSubmit = (requestName) => {
    setQuery(requestName)
    setImages([])
    setPage(1)
    setTotal(0)
  }

  const onClickLoadMore = () => {
    setPage(page + 1)
  }

  const openModal = (image) => {
    setLargeImage(image.largeImageURL)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (<div className='App'
  >
    <Searchbar onSubmit={onSubmit} prevRequest={query}></Searchbar>
    <ImageGallery>
      <ImageGalleryItem images={images} openModal={openModal} />
    </ImageGallery>
    {loading && <Loader />}
    {(page < Math.ceil(total / 12)) && <Button loadMore={onClickLoadMore} />}
    {modalIsOpen && <Modal image={largeImage} closeModal={closeModal} />}
  </div>
  )
};

