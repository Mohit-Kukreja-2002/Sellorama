"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// Icons
import { IoAdd, IoRemove } from 'react-icons/io5'

// Custom hooks
import useGetSidebarProducts from '../../hooks/products/getSidebarProducts'

const Sidebar = () => {
    // Usestate to manage the opening/closing of a particular category
    const [itemActive, setItemActive] = useState(0);
    const [products, setProducts] = useState({});

    // getting product using custom hook
    const { loading, getProducts } = useGetSidebarProducts();

    // dummy data 
    const sidebarProducts = {
        "Clothes": {
            "Shirt": "300",
            "Shorts_Jeans": "200",
            "Jackets": "50",
            "Dress_Frock": "87"
        },
        "Bags": {
            "Shopping Bag": "68",
            "Gym Backpack": "46",
            "Purse": "79",
            "Wallet": "73"
        },
        "Jewelry": {
            "Earrings": "46",
            "Couple Rings": "200",
            "Necklace": "61"
        },
        "Footwears": {
            "Sports": "100",
            "Formal": "200",
            "Casual": "50",
            "Safety Shoes": "87"
        },
        "Cosmetics": {
            "Shampoo": "68",
            "Sunscreen": "46",
            "Body Wash": "79",
            "Makeup Kit": "73"
        },
        "Glasses": {
            "Sunglasses": "68",
            "Lenses": "46",
            "Body Wash": "79",
            "Makeup Kit": "73"
        },
        "Perfume": {
            "Cloths Perfumes": "12 pcs",
            "Deoderant": "60 pcs"
        },
    };

    // Call getProducts when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getProducts();
                if (products[0]) setProducts(products[1] || sidebarProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="sidebar has-scrollbar">
            <div className="sidebar-category">

                <div className="sidebar-top">
                    <h2 className="sidebar-title">Category</h2>
                    <button className="sidebar-close-btn" data-mobile-menu-close-btn="">
                        <ion-icon name="close-outline" />
                    </button>
                </div>

                <ul className="sidebar-menu-category-list">
                    {
                        Object.entries(Object.entries(products).length > 0 ? products : sidebarProducts).map(([category, productList], i) => {
                            return <div key={i}>
                                <li className="sidebar-menu-category">
                                    <button className="sidebar-accordion-menu"
                                        onClick={() => {
                                            itemActive !== i + 1 ? setItemActive(i + 1) : setItemActive(0)
                                        }}
                                    >
                                        <div className="menu-title-flex">
                                            <Image
                                                src={`/images/icons/${category.toLowerCase()}.svg`}
                                                alt={category}
                                                width={20}
                                                height={20}
                                                className="menu-title-img"
                                            />
                                            <p className="menu-title">{category}</p>
                                        </div>
                                        <div className='text-[#454545]'>
                                            <IoAdd className={`${itemActive === i + 1 ? "hidden" : "block"} add-icon`} />
                                            <IoRemove className={`${itemActive === i + 1 ? "block" : "hidden"} remove-icon`} />
                                        </div>
                                    </button>
                                    <ul className={`sidebar-submenu-category-list ${itemActive === i + 1 && "block"}`}>
                                        {
                                            Object.entries(productList).map(([productName, count], indx) => {
                                                return <li key={category + indx} className="sidebar-submenu-category">
                                                    <Link href={`/search/${productName.replace("_"," ")}`} className="sidebar-submenu-title">
                                                        <p className="product-name">{productName.replace("_"," ")}</p>
                                                        <data value={count} className="stock" title="Available Stock">
                                                            {count}
                                                        </data>
                                                    </Link>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                            </div>
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default Sidebar