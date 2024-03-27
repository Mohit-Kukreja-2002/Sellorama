"use client"
import Heading from "../../utils/Heading";
import ProductDetail from "../../components/Product/ProductDetail";
import Navbar from "../../components/Navigation/Navbar";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/auth/getUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../redux/features/authSlice";
import LoginModal from "../../components/Auth/LoginModal";
import SignUpModal from "../../components/Auth/SignUpModal";
import VerficationModal from "../../components/Auth/VerificationModal";
import ChatBox from "../../components/Product/ChatBox";
import toast from "react-hot-toast";

const Page = ({ params }) => {
    const [openModal, setOpenModal] = useState(0);
    const [activationToken, setActivationToken] = useState("");

    const [chatOpen, setChatOpen] = useState(false);
    const [seller, setSeller] = useState("");

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuth);

    const { loading, getUser } = useGetUser();

    useEffect(() => {
        async function fetchData() {
            const data = await getUser();
            if (data[0] && data[1]?.user) {
                dispatch(setLogin(data[1].user));
            }
        }
        !user && fetchData();
    }, [])

    if(chatOpen && !isAuth){
        setChatOpen(false)
        toast.error("Login to communicate with seller")
    }


    return (
        <div className="relative">
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
            <ProductDetail setChatOpen={setChatOpen} setSeller={setSeller} id={params.id} />
            {chatOpen && isAuth && <ChatBox id={params.id} sellerId={seller} setChatOpen={setChatOpen}/>}
        </div>
    )
}
export default Page;