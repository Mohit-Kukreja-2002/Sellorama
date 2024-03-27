"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

// custom hooks
import useGetProductGrid from '../../hooks/products/getProductGrid';

const ProductGrid = () => {

    // dummy data
    const productGrid = [
        {
            category: "jacket",
            productName: "Mens Winter Leathers Jackets",
            price: "480",
            discount: "17",
            image: [
                {
                    url: "/images/products/jacket-3.jpg",
                },
                {
                    url: "/images/products/jacket-4.jpg"
                }
            ]
        },
        {
            category: "shirt",
            productName: "Pure Garment Dyed Cotton Shirt",
            price: "490",
            discount: "15",
            image: [
                {
                    url: "/images/products/shirt-1.jpg",
                },
                {
                    url: "/images/products/shirt-2.jpg"
                }
            ]
        },
        {
            category: "jacket",
            productName: "MEN Yarn Fleece Full-Zip Jacket",
            price: "580",
            discount: "10",
            image: [
                {
                    url: "/images/products/jacket-5.jpg",
                },
                {
                    url: "/images/products/jacket-6.jpg"
                }
            ]
        },
        {
            category: "skirt",
            productName: "Black Floral Wrap Midi Skirt",
            price: "1200",
            discount: "10",
            image: [
                {
                    url: "/images/products/clothes-3.jpg",
                },
                {
                    url: "/images/products/clothes-4.jpg",
                }
            ]
        },
        {
            category: "shoes",
            productName: "Trekking & Running Shoes - black",
            price: "2050",
            discount: "8",
            image: [
                {
                    url: "/images/products/sports-2.jpg",
                },
                {
                    url: "/images/products/sports-4.jpg",
                }
            ]
        },
        {
            category: "watches",
            productName: "Trekking & Running Shoes - black",
            price: "750",
            discount: "20",
            image: [
                {
                    url: "/images/products/watch-1.jpg",
                },
                {
                    url: "/images/products/watch-2.jpg",
                }
            ]
        },
        {
            category: "jacket",
            productName: "Mens Winter Leathers Jackets",
            price: "1300",
            discount: "17",
            image: [
                {
                    url: "/images/products/jacket-1.jpg",
                },
                {
                    url: "/images/products/jacket-2.jpg"
                }
            ]
        },
        {
            category: "formal",
            productName: "Men's Leather Formal Wear shoes",
            price: "2100",
            discount: "15",
            image: [
                {
                    url: "/images/products/shoe-1.jpg",
                },
                {
                    url: "/images/products/shoe-1_1.jpg",
                }
            ]
        },
        {
            category: "shorts",
            productName: "Better Basics French Terry Sweatshorts",
            price: "600",
            discount: "10",
            image: [
                {
                    url: "/images/products/shorts-1.jpg",
                },
                {
                    url: "/images/products/shorts-2.jpg",
                }
            ]
        },
        {
            category: "party wear",
            productName: "Womens Party Wear Shoes",
            price: "1900",
            discount: "15",
            image: [
                {
                    url: "/images/products/party-wear-1.jpg",
                },
                {
                    url: "/images/products/party-wear-2.jpg",
                }
            ]
        },
        {
            category: "watches",
            productName: "Pocket Watch Leather Pouch",
            price: "1200",
            discount: "25",
            image: [
                {
                    url: "/images/products/watch-3.jpg",
                },
                {
                    url: "/images/products/watch-4.jpg",
                }
            ]
        },
        {
            category: "watches",
            productName: "Smart watche Vital Plus",
            price: "1920",
            discount: "15",
            image: [
                {
                    url: "/images/products/watch-1.jpg",
                },
                {
                    url: "/images/products/watch-2.jpg",
                }
            ]
        },
    ];

    const [products, setProducts] = useState(productGrid);

    // get products using this hook
    const {loading, getProducts} = useGetProductGrid();

    // fetch products when component is loaded
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                if(data[0]) setProducts(data[1].concat(productGrid));
            } catch (e) {
                console.error('Error fetching products: ', e);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="product-main">
            <h2 className="title">New Products</h2>
            <div className="product-grid">
                {
                    products.slice(0,12).map((product, indx) => (
                        <Link href={`/product/${product._id}`} key={indx} className="flex flex-col showcase">
                            <div className="my-auto showcase-banner">
                                <img
                                    src={(product.image?.length > 0 ? true : false )? product.image[0]?.url : productGrid[indx].image[0].url}
                                    alt={product.productName}
                                    width={300}
                                    className="product-img default"
                                />
                                <img
                                    src={(product.image?.length > 0 ? true : false ) ? product.image[1]?.url : productGrid[indx].image[1].url}
                                    alt={product.productName}
                                    width={300}
                                    className="product-img hover"
                                />
                                <p className="showcase-badge">{product.discount + '%'}</p>
                            </div>
                            <div className="mt-auto showcase-content">
                                <div className="showcase-category">
                                    {product.category?.toUpperCase()}
                                    <h3 className="showcase-title">
                                        {product.productName}
                                    </h3>
                                </div>
                                <div className="price-box">
                                    <p className="price">₹{product.price - Math.round((Number(product.discount) * Number(product.price) / 100))}</p>
                                    <del> ₹{product.price}</del>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductGrid