"use client"
import { useEffect, useState } from "react";

// Page utilities
import Heading from "./utils/Heading";
import Navbar from "./components/Navigation/Navbar";
import Hero from "./components/Hero";

// Authentication components
import LoginModal from "./components/Auth/LoginModal";
import SignUpModal from "./components/Auth/SignUpModal";
import VerficationModal from "./components/Auth/VerificationModal";

// Custom Hooks
import useGetUser from "./hooks/auth/getUserDetails";

// Redux
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/features/authSlice";

export default function Home() {

  // States for authentication
  const [openModal, setOpenModal] = useState(0);
  const [activationToken, setActivationToken] = useState("");

  // dispatching to the redux store
  const dispatch = useDispatch();

  // Get user hook
  const {loading, getUser} = useGetUser();

  // UseEffect to fetch user details
  useEffect(()=>{
    async function fetchData(){
      const data = await getUser();
      if(data[0] && data[1]?.user){
        dispatch(setLogin(data[1].user));
      }
    }
    fetchData();
  },[])


  return (
    <div className="relative">

      <Heading
        title={"Sellorama"}
        description={"Conversation based eccommerce"}
        keywords={"sellorama ecommerce selling buying"}
      />

      <Navbar setOpenModal={setOpenModal}/>
      {openModal === 1 && <LoginModal setOpenModal={setOpenModal} /> } 
      {openModal === 2 && <SignUpModal setActivationToken={setActivationToken} setOpenModal={setOpenModal} /> } 
      {openModal === 3 && <VerficationModal activationToken={activationToken} setOpenModal={setOpenModal} /> } 

      <Hero/>
    </div>
  );
}
