import toast from 'react-hot-toast';
import useGetProductById from '../../hooks/products/getProductById';
import React, { useEffect, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import useAddToLiked from '../../hooks/wishlist/addToLiked';
import { addProductToWishlist, setLogin } from '../../../redux/features/authSlice'; 
import { addLikedProducts } from '../../../redux/features/productSlice';

const ProductDetail = ({ id, setChatOpen, setSeller }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const { loading, getProduct } = useGetProductById();

  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const { likeProduct } = useAddToLiked()

  const addToLiked = async () => {
    if (!isAuth) {
      toast.error("Please login to add this product to your favorites");
    } else {
      if (!user.wishlist.includes(id)) {
        let res = await likeProduct(id);
        if (res) {
          dispatch(addProductToWishlist({ id }))
          if (product) dispatch(addLikedProducts({ product }))
          toast.success("Product added to wishlist successfully")
        }
      } else {
        toast.success("Product is already in the wishlist")
      }
    }
  }

  useEffect(() => {

  }, [user])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProduct(id);
        if (response[0]) {
          setProduct(response[1]);
          // console.log(response[1]);
          setSeller(response[1]?.creator);
          setSelectedImage(response[1]?.image[0]?.url || "")
        }
      } catch (error) {
        // console.log(error)
        toast.error("Error Fetching Prouduct, Please refresh once.")
      }
    }
    fetchData();
  }, [])


  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (

    loading
      ?
      <div className='flex items-center justify-center text-black'>
        <h1 className='text-xl font-bold'>FETCHING PRODUCT DETAILS...</h1>
      </div>
      :
      <div className='text-black product-detail-container'>
        {product && (
          <div className='product-inner-container'>
            <div className='product-detail-image-container'>
              <img className='product-detail-images max-h-[150px] 500px:max-h-[200px] 600px:max-h-[250px] 700px:max-h-[300] 900px:max-h-[400px]' src={selectedImage} alt={product.productName} />
            </div>
            <div className='product-detail-info'>
              <h1>{product.productName}</h1>
              <h4>{product.category}</h4>
              <div className='mt-1 ml-1 text-center 900px:text-left 900px:mb-10'>
                <p>{product.description}</p>
              </div>
              <div className="justify-center price-box 900px:justify-start">
                <p className="price">₹{product.price - Math.round((Number(product.discount) * Number(product.price) / 100))}</p>
                <del> ₹{product.price}</del>
              </div>
              <div className='hidden mt-4 900px:block product-detail-preview'>
                <h3 className='mb-2'>Product preview</h3>
                <div className='justify-center 900px:justify-normal'>
                  {product.image.map((photo, index) => (
                    <img
                      key={index}
                      className='product-detail-previewImg !900px:max-w-[200px] !700px:max-w-[150px] !max-w-[100px]'
                      src={photo.url}
                      alt={`Preview ${index}`}
                      onClick={() => handleImageClick(photo.url)}
                    />
                  ))}
                </div>
              </div>
              <div className='block mt-4 900px:hidden product-detail-preview'>
                <h3 className='mb-2'>Product preview</h3>
                <div className='justify-center 900px:justify-normal'>
                  {product.image.slice(0,2).map((photo, index) => (
                    <img
                      key={index}
                      className='product-detail-previewImg'
                      src={photo.url}
                      alt={`Preview ${index}`}
                      onClick={() => handleImageClick(photo.url)}
                    />
                  ))}
                </div>
              </div>
              <div className='flex justify-center mx-auto mb-5 ml-1 900px:justify-normal'>
                <div onClick={() => setChatOpen(prev => !prev)} className='cursor-pointer mx-1 py-2 transition-all duration-200 ease-linear hover:bg-[#212121] rounded-[5px] px-2 my-auto font-bold text-[1rem] w-max bg-[#ff8f9c] text-white'>
                  Contact With Seller
                </div>
                <div className='mx-1 py-2 transition-all duration-200 cursor-pointer ease-linear hover:bg-[#212121] rounded-[5px] px-3 my-auto font-bold text-[1rem] w-max bg-[#ff8f9c] text-white'>
                  <IoMdHeartEmpty onClick={addToLiked} size={25} />
                </div>
              </div>
            </div>
          </div>
        )
        }
      </div >
  );
};

export default ProductDetail;
