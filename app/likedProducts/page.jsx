"use client"
import { redirect, useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../utils/Heading'
import Navbar from '../components/Navigation/Navbar'
import LoginModal from '../components/Auth/LoginModal'
import SignUpModal from '../components/Auth/SignUpModal'
import VerficationModal from '../components/Auth/VerificationModal'
import LikedProducts from '../components/LikedProducts'
import { setLogin } from '../../redux/features/authSlice'
import useGetUser from '../hooks/auth/getUserDetails'

const Page = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    const [openModal, setOpenModal] = useState(0);
    const [activationToken, setActivationToken] = useState("");
    const [intial, setInitial] = useState(true);

    const dispatch = useDispatch();

    // For fetching user
    const { loading ,getUser } = useGetUser();
    const router = useRouter()


    useEffect(() => {
        async function fetchData() {
            const data = await getUser();
            if (data[0] && data[1]?.user) {
                dispatch(setLogin(data[1].user));
            }else if(!data[0]){
                intial && toast.error("First login to proceed")
                router.push('/')
            }
        }
        !isAuth && fetchData();
        setInitial(false)
    }, [isAuth])

    // Render the page content if authenticated
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
                {/* <Hero /> */}
                <LikedProducts />
            </div>

    );
}

export default Page