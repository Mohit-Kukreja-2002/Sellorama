import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <div className="slider-container has-scrollbar">
                    <div className="slider-item">
                        <Image
                            src="/images/banner-2.jpg"
                            alt="modern sunglasses"
                            className="banner-img"
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                        <div className="banner-content">
                            <p className="banner-subtitle">Trending accessories</p>
                            <h2 className="banner-title">Modern sunglasses</h2>
                            <p className="banner-text">
                                starting at ₹ <b>150</b>.00
                            </p>
                            <Link href={`/search/sunglasses`} className="banner-btn">
                                Shop now
                            </Link>
                        </div>
                    </div>
                    <div className="slider-item">
                        <Image
                            src="/images/banner-1.jpg"
                            alt="women's latest fashion sale"
                            className="banner-img"
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                        <div className="banner-content">
                            <p className="banner-subtitle">Trending item</p>
                            <h2 className="banner-title">Women's latest fashion sale</h2>
                            <p className="banner-text">
                                starting at ₹ <b>199</b>.00
                            </p>
                            <Link href={'/search/women'} className="banner-btn">
                                Shop now
                            </Link>
                        </div>
                    </div>
                    <div className="slider-item">
                        <Image
                            src="/images/banner-3.jpg"
                            alt="new fashion summer sale"
                            className="banner-img"
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                        <div className="banner-content">
                            <p className="banner-subtitle">Sale Offer</p>
                            <h2 className="banner-title">New fashion summer sale</h2>
                            <p className="banner-text">
                                starting at ₹ <b>200</b>.00
                            </p>
                            <Link href={'/search/summer'} className="banner-btn">
                                Shop now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner