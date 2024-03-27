"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// CSS Files
import '../../css/style.css'
import '../../css/style-prefix.css'

// Icons
import { IoMdSearch, IoMdHeartEmpty, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin, IoMdClose, IoMdAdd } from "react-icons/io";
import { IoPersonOutline, IoBagHandleOutline, IoMenu, IoHomeOutline, IoGridOutline, IoLogoFacebook, IoAdd, IoAddCircle, IoRemove, IoCaretBack, IoChatbox, IoChatboxOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

// Import Files
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

// Redux Imports
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

// navigation
import { useRouter } from 'next/navigation'


// Custom Hooks
import useLogout from '../../hooks/auth/useLogout'

const Navbar = ({ categoryShown, setOpenModal }) => {

    // Usestates
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [search, setSearch] = useState("");

    // const [itemActive, setItemActive] = useState(3);

    // Utitlies
    const router = useRouter()

    // redux states
    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)

    // Go to liked products page
    const handleLikedProduct = () => {
        if (!isAuth) {
            toast.error("Please Login to See Your Liked Products")
        } else {
            router.push('/likedProducts')
        }
    }

    // Go to chats page
    const handleOpenChats = () => {
        if (!isAuth) {
            toast.error("Please Login to See Your Chats")
        } else {
            router.push('/chat')
        }
    }

    const goToSearchedPage = () => {
        router.push(`/search/${search}`)
    }

    const { loading, logout } = useLogout();

    const logoutHandler = async () => {
        const respone = await logout()
    }

    return (
        <header>

            <div className="header-main">

                <div className="container">

                    {/* Sellorma Image */}
                    <Link href="/" className="header-logo">
                        <Image priority src="/logobetter.png" alt="Sellorama's logo" width={80} height={50} />
                    </Link>

                    {/* Search Bar */}
                    <div className="header-search-container !ml-0">
                        <input
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    goToSearchedPage();
                                }
                            }}
                            value={search} onChange={(e) => setSearch(e.target.value)}
                            type="search" name="search" className="search-field"
                            placeholder="Enter your product name..."
                        />
                        <button className="search-btn">
                            <Link href={`/search/${search}`}>
                                <IoMdSearch />
                            </Link>
                        </button>
                    </div>

                    {/* User Image / Default Image */}
                    <div className="header-user-actions">
                        {
                            isAuth
                                ?

                                <div className='relative'>
                                    <Image
                                        width={150}
                                        onClick={() => setOpenPopup(!openPopup)}
                                        height={150}
                                        src={user.avatar}
                                        className={`w-[40px] h-[40px] items-center text-center rounded-full mr-5 800px:mr-2 cursor-pointer block`}
                                        alt=""
                                    />
                                    <div id="dropdownAvatar" className={`${!openPopup ? "hidden" : ""} absolute left-[-20px] mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36`}>
                                        {
                                            !loading ?
                                                <div onClick={logoutHandler} className="flex items-center py-2 text-gray-700 transition-all duration-200 ease-in cursor-pointer hover:bg-gray-200">
                                                    <CiLogout className='ml-4' size={20} />
                                                    <div className="block px-2 py-2 text-sm">Sign out</div>
                                                </div>
                                                : <div className="flex items-center py-2 text-gray-700 transition-all duration-200 ease-in bg-gray-200 cursor-pointer">
                                                    <CiLogout className='ml-4' size={20} />
                                                    <div className="block px-2 py-2 text-sm">Signing Out..</div>
                                                </div>
                                        }
                                    </div>
                                </div>

                                : <button className="action-btn">
                                    <IoPersonOutline
                                        onClick={() => setOpenModal(1)}
                                    />
                                </button>
                        }

                        <button className="action-btn">
                            <IoMdHeartEmpty onClick={handleLikedProduct} />
                            <span className="count">{user?.wishlist.length || 0}</span>
                        </button>

                        <button className="action-btn">
                            <IoChatboxOutline onClick={handleOpenChats} />
                        </button>
                    </div>

                </div>

            </div>

            {/* Category shown is for different pages such as chat, landing etc */}
            {categoryShown !== false && <div className={"hidden md:block"}>
                <DesktopNav />
            </div>}


            {/* Mobile navigator */}
            <div className="mobile-bottom-navigation">

                <button className="action-btn" onClick={() => setOpenSidebar(true)}>
                    <IoMenu />
                </button>

                <button className="action-btn">
                    <IoChatboxOutline onClick={handleOpenChats} />
                </button>

                <button className="action-btn">
                    <Link href={'/'}>
                        <IoHomeOutline />
                    </Link>
                </button>

                <button className="action-btn">
                    <IoMdHeartEmpty onClick={handleLikedProduct} />
                    <span className="count">{user?.wishlist.length || 0}</span>
                </button>

                {
                    isAuth
                        ?
                        <div className='relative'>
                            <Image
                                width={150}
                                onClick={() => setOpenPopup(!openPopup)}
                                height={150}
                                src={user.avatar}
                                className={`w-[40px] h-[40px] items-center text-center rounded-full mr-5 800px:mr-2 cursor-pointer block`}
                                alt=""
                            />
                            <div onClick={logoutHandler} id="dropdownAvatar" className={`${!openPopup ? "hidden" : ""} absolute right-[-20px] top-[-70px] mb-44 z-1000 bg-white divide-y divide-gray-100 rounded-lg shadow w-36`}>
                                {
                                    !loading
                                        ? <div onClick={logoutHandler} className="flex items-center py-2 text-gray-700 transition-all duration-200 ease-in cursor-pointer hover:bg-gray-200">
                                            <CiLogout className='ml-4' size={20} />
                                            <div className="block px-2 py-2 text-sm">Sign out</div>
                                        </div>

                                        : <div className="flex items-center py-2 text-gray-700 transition-all duration-200 ease-in bg-gray-200 cursor-pointer">
                                            <CiLogout className='ml-4' size={20} />
                                            <div className="block px-2 py-2 text-sm">Signing Out...</div>
                                        </div>
                                }
                            </div>
                        </div>
                        : <button className="action-btn">
                            <IoPersonOutline
                                onClick={() => setOpenModal(1)}
                            />
                        </button>
                }

            </div>

            {/* Sidebar for mobile screens */}
            <div className='block lg:hidden' >
                <MobileNav setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
            </div>

        </header>
    )
}

export default Navbar