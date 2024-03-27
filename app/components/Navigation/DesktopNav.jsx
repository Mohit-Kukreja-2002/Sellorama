import Link from 'next/link'
import React from 'react'

const DesktopNav = () => {
    return (
        <nav className="desktop-navigation-menu">

            <div className="container">
                <ul className="desktop-menu-category-list">

                    <li className="menu-category">
                        <Link href={'/'} className="menu-title">Home</Link>
                    </li>

                    <li className="menu-category">
                        <div className="menu-title">Categories</div>

                        <div className="dropdown-panel">
                            <ul className="dropdown-panel-list">

                                <li className="menu-title">
                                    <Link href={`/search/Electronics`}>Electronics</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Desktop`}>Desktop</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Laptop`}>Laptop</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Camera`}>Camera</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Tablet`} >Tablet</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Headphone`}>Headphone</Link>
                                </li>

                            </ul>

                            <ul className="dropdown-panel-list">

                                <li className="menu-title">
                                    <Link href={`/search/Men`}>Men's</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Mens Formal`}>Formal</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Mens Casual`}>Casual</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Sports`}>Sports</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Jacket`}>Jacket</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Sunglasses`}>Sunglasses</Link>
                                </li>

                            </ul>

                            <ul className="dropdown-panel-list">

                                <li className="menu-title">
                                    <Link href={`/search/Women`}>Women's</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Women Formal`}>Formal</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Women Casual`}>Casual</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Perfume`}>Perfume</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Cosmetics`}>Cosmetics</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Bags`}>Bags</Link>
                                </li>

                            </ul>

                            <ul className="dropdown-panel-list">

                                <li className="menu-title">
                                    <Link href={`/search/Daily Essentials`}>Daily Essentials</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Dairy`}>Dairy</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Fruits`}>Fruits</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Drinks`}>Drinks</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Consumables`}>Consumables</Link>
                                </li>

                                <li className="panel-list-item">
                                    <Link href={`/search/Medicines`}>Medicines</Link>
                                </li>

                            </ul>
                        </div>
                    </li>

                    <li className="menu-category">
                        <Link href={`/search/Gaming`} className="menu-title">Gaming</Link>

                        <ul className="dropdown-list">

                            <li className="dropdown-item">
                                <Link href={`/search/Controllers`} >Controllers</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Ipad`} >Ipad</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Earphones`} >Earphones</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Gaming Glasses`} >Glasses</Link>
                            </li>

                        </ul>
                    </li>

                    <li className="menu-category">
                        <Link href={`/search/Furniture`} className="menu-title">Furniture</Link>

                        <ul className="dropdown-list">

                            <li className="dropdown-item">
                                <Link href={`/search/Table`} >Table&apos;s</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Bed`} >Bed&apos;s</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Sofa`} >Sofa&apos;s</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Chair`} >Chair&apos;s</Link>
                            </li>

                        </ul>
                    </li>

                    <li className="menu-category">
                        <Link href={`/search/Jewelry`}  className="menu-title">Jewelry</Link>

                        <ul className="dropdown-list">

                            <li className="dropdown-item">
                                <Link href={`/search/Earrings`} >Earrings</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Couple Rings`} >Couple Rings</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Necklace`} >Necklace</Link>
                            </li>

                            <li className="dropdown-item">
                                <Link href={`/search/Bracelets`} >Bracelets</Link>
                            </li>

                        </ul>
                    </li>

                </ul>

            </div>

        </nav>
    )
}

export default DesktopNav