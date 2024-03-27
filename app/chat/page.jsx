"use client"
import React, { useEffect, useState } from 'react'
import '../css/chatPage.css'

// Essential Page components
import Navbar from '../components/Navigation/Navbar'
import Heading from '../utils/Heading'

// Auth components
import LoginModal from '../components/Auth/LoginModal'
import SignUpModal from '../components/Auth/SignUpModal'
import VerficationModal from '../components/Auth/VerificationModal'

// Chat related components
import Sidebar from '../components/Chat/Sidebar'
import Welcome from '../components/Chat/Welcome'
import ChatArea from '../components/Chat/ChatArea'

// Socket library
import { io } from 'socket.io-client'

// Redux reducers
import { setLogin } from '../../redux/features/authSlice'
import { setLastMessages, setSelectedChat, setSidebarSellers } from '../../redux/features/chatSlice'

// redux utilities
import { useDispatch, useSelector } from 'react-redux'

// Custom hooks
import useGetChattedSellers from '../hooks/chat/getChattedSellers'
import useGetUser from '../hooks/auth/getUserDetails'
import useListenMessages from '../hooks/chat/useListenMessages'
import { useRouter } from 'next/navigation'


const Page = () => {

    // For login, signOut Models
    const [openModal, setOpenModal] = useState(0);
    const [activationToken, setActivationToken] = useState("");

    // For Sidebar
    const { loading: loadingSidebar, getSidebarSellers } = useGetChattedSellers();

    // Related to redux
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuth)
    const selectedChat = useSelector(state => state.chat.selectedChat)
    const sidebarSellers = useSelector(state => state.chat.sidebarSellers)

    // For fetching user
    const { getUser } = useGetUser();

    // For socket connection
    const [socket, setSocket] = useState(null)

    // useeffect for establishing socket connection
    useEffect(() => {
        if (isAuth) {
            const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
                query: {
                    userId: user._id,
                },
            });

            setSocket(socket);
            return () => {
                socket.close();
                setSocket(null);
            }

        } else {
            if (socket) {
                socket.close();
                setSocket(null);
                // router.push('/')
            }
        }
    }, [isAuth]);

    const router = useRouter()

    // useEffect for fetching user information
    useEffect(() => {
        async function fetchData() {
            const data = await getUser();
            if (data[0] && data[1]?.user) {
                dispatch(setLogin(data[1].user));
            } else if (!data[0]) {
                router.push('/')
            }
        }
        !isAuth && fetchData();

        return () => dispatch(setSelectedChat(["", -1]))
    }, [isAuth])

    // useEffeect for fetching sidebarSellers and lastMessages
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getSidebarSellers();
                if (response[0]) {
                    dispatch(setSidebarSellers(response[1]));
                    dispatch(setLastMessages(response[2]));
                }
            } catch (error) {
                console.error("Failed to fetch sidebarSellers", error);
            }
        }
        fetchData();

    }, [])

    useListenMessages(socket)

    return (
        isAuth && <div className="relative">
            <Heading
                title={"Sellorama"}
                description={"Conversation based eccommerce"}
                keywords={"sellorama ecommerce selling buying"}
            />
            <Navbar categoryShown={false} setOpenModal={setOpenModal} />
            {openModal === 1 && <LoginModal setOpenModal={setOpenModal} />}
            {openModal === 2 && <SignUpModal setActivationToken={setActivationToken} setOpenModal={setOpenModal} />}
            {openModal === 3 && <VerficationModal activationToken={activationToken} setOpenModal={setOpenModal} />}

            {/* for large screens */}
            <div className={"main-container-big mx-auto mb-12 mt-2"}>
                {sidebarSellers.length !== 0 && <Sidebar
                    loadingSidebar={loadingSidebar}
                />}
                {selectedChat[0] === ""
                    ? <Welcome
                        text={sidebarSellers.length === 0}
                        user={user}
                        center={true}
                    />
                    : <ChatArea
                        socket={socket}
                    />
                }
            </div>

            <div className='mx-auto mb-16 main-container'>

                {
                    sidebarSellers.length === 0
                        ? <Welcome
                            text={sidebarSellers.length === 0}
                            user={user}
                        />
                        : (
                            selectedChat[0] === ""
                                ? <Sidebar
                                    loadingSidebar={loadingSidebar}
                                />
                                : <ChatArea
                                    socket={socket}
                                />
                        )
                }
            </div>
        </div>
    )
}

export default Page