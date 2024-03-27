import React, { useEffect, useState } from 'react'
import useGetLikedProducts from '../hooks/wishlist/getLikedProducts'
import Link from 'next/link';
import { IoHeartDislikeSharp } from 'react-icons/io5';


import { removeProductFromWishlist } from '../../redux/features/authSlice';
import { removeLikedProducts, setLikedProducts } from '../../redux/features/productSlice';

import useRemoveLikedProducts from '../hooks/wishlist/removeFromLiked';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const LikedProducts = () => {

    const { loading, getProducts } = useGetLikedProducts();

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    let products = useSelector(state => state.products.likedProducts);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProducts();
                if (data[0]) {
                    dispatch(setLikedProducts({products: data[1]}))
                }
            } catch (e) {
                console.error('Error fetching products:', e);
            }
        }
        products.length===0 && fetchData();
    }, [])

    const {removeLikedProduct} = useRemoveLikedProducts();

    const removeFromLiked = async (id) => {
        if (user.wishlist.includes(id)) {
            let res = await removeLikedProduct(id);
            if (res) {
                dispatch(removeProductFromWishlist({ id }))
                dispatch(removeLikedProducts({ id }));
                toast.success("Product removed to wishlist successfully")
            }
        } else {
            toast.success("You Havent wishlisted this product")
        }
    }

    return (
        <div className='mb-16 text-black'>
            <div className='mt-4 font-bold text-center'>
                <h2>Total Liked Products : {products.length}</h2>
            </div>
            <div className='mx-4 mt-4 liked-product-container'>
                {
                    products.map((product) => (
                        <div className='flex likedProduct-Box'>
                            <Link className='mr-1 400px:mr-4' href={`product/${product._id}`}>
                                <img
                                    className='ml-4 cursor-pointer 800px:w-[140px] w-[100px] mr-0'
                                    src={product.image[0]?.url || product.image.url}
                                    alt='productName'
                                />
                            </Link>

                            <Link
                                href={`product/${product._id}`}
                                className="flex flex-col flex-grow my-auto ml-1 cursor-pointer 400px:ml-3"
                            >
                                <div className='flex justify-start'>
                                    <h3>{product.productName}</h3>
                                </div>
                                <div className="flex gap=[15px]">
                                    <p className="mr-2 text-[#ff8f9c] text-[20px] font-[600]">₹{product.price - Math.round((Number(product.discount) * Number(product.price) / 100))}</p>
                                    <del className='text-[#787878] my-auto text-[16px]'> ₹{product.price}</del>
                                </div>
                            </Link>

                            <div onClick={()=>removeFromLiked(product._id)} className='text-[#ff9f8c] hover:text-[black] ml-2 mr-0 400px:mx-5 my-auto cursor-pointer'>
                                <IoHeartDislikeSharp size={40} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LikedProducts