"use client"
import Heading from "../../utils/Heading";
import Navbar from "../../components/Navigation/Navbar";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/auth/getUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../redux/features/authSlice";
import SearchPage from "../../components/SearchPage";
import LoginModal from "../../components/Auth/LoginModal";
import SignUpModal from "../../components/Auth/SignUpModal";
import VerficationModal from "../../components/Auth/VerificationModal";

const Page = ({ params }) => {
    const [openModal, setOpenModal] = useState(0);
    const [activationToken, setActivationToken] = useState("");

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

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


    return (
        <div className="relative min-h-screen">
            <Heading
                title={""}
                description={"Conversation based eccommerce"}
                keywords={"sellorama ecommerce selling buying"}
            />
            <Navbar categoryShown={false} setOpenModal={setOpenModal} />
            {openModal === 1 && <LoginModal setOpenModal={setOpenModal} />}
            {openModal === 2 && <SignUpModal setActivationToken={setActivationToken} setOpenModal={setOpenModal} />}
            {openModal === 3 && <VerficationModal activationToken={activationToken} setOpenModal={setOpenModal} />}
            {/* <Hero /> */}
            <SearchPage searchQuery={params.search} />
        </div>
    )
}
export default Page;