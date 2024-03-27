"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// Icons
import { IoClose } from 'react-icons/io5'
import { AiOutlineCamera } from "react-icons/ai";

// Utilites
import toast from 'react-hot-toast';
import avatarIcon from "../../../public/user1.png"

// Custom Hooks
import useSignUp from '../../hooks/auth/useSignup';
// import avatarIcon from "../../../publi/user.png";


const SignUpModal = ({ setActivationToken, setOpenModal }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const ref = useRef();

    // Hooks to handle the signup process
    const { loading, signUp } = useSignUp();

    // useEffect to close modal on clicking outside of the modal
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref.current || !ref.current.contains(e.target)) {
                setOpenModal(0);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [])

    // to set the selected image and to present its preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    // submission of details
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            toast.error('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedImage);
        formData.append('name', e.target.name.value);
        formData.append('email', e.target.email.value);
        formData.append('password', e.target.password.value);

        if (formData.get("name").length === 0 || formData.get("email").length === 0 || formData.get("password").length === 0) {
            toast.error("Please fill in all the fields")
            return;
        }
        if (formData.get("password").length < 8) {
            toast.error("Password must be at least 8 characters")
            return;
        }
        if (selectedImage === null) {
            toast.error("Please input an avatar")
            return;
        }

        // Send formData to the server for further processing
        let activationToken = await signUp(formData);

        if (activationToken === "") return;
        setActivationToken(activationToken)
        
        // Go to the activation page
        setOpenModal(3);
    };

    return (
        <>
            <div className="overlay"></div>

            <div className="modal">

                <div className="modal-close-overlay"></div>

                <div ref={ref} className="modal-content">

                    <button className="modal-close-btn">
                        <IoClose onClick={() => setOpenModal(0)} />
                    </button>

                    <div className="flex justify-center w-full mt-8 md:ml-5 md:mt-0">
                        <div className="relative">
                            <Image
                                src={selectedImage ? URL.createObjectURL(selectedImage) : avatarIcon}
                                alt=""
                                width={150}
                                height={150}
                                className="w-[150px] h-[150px] text-black cursor-pointer border-[3px] border-[#9c3353] rounded-full"
                            />
                            <input
                                type="file"
                                name=""
                                id="avatar"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/png,image/jpg,image/jpeg,image/webp"
                            />
                            <label htmlFor="avatar">
                                <div className="w-[30px] text-white h-[30px] bg-[#9c3353] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                                    <AiOutlineCamera size={20} className="z-1" />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="auth-modal p-4 m-4 600px:m-6 mx-auto min-w-[350px] text-black">

                        <form onSubmit={(e) => handleSubmit(e)}>

                            <div className="auth-modal-header">

                                <h3 className="auth-modal-title">CREATE AN ACCOUNT...</h3>

                            </div>

                            <input type="text" name="name" className="email-field" placeholder="Name" required />

                            <input type="email" name="email" className="email-field" placeholder="Email Address" required />

                            <input type="password" name="password" className="email-field" placeholder="Password" required />

                            {/* SO that multiple requests are not made */}
                            {loading ?
                                <button disabled className='btn-auth-modal bg-[#FF8F9C]' role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </button>
                                :
                                <button type="submit" className="btn-auth-modal">
                                    SIGN UP
                                </button>
                            }

                            <p onClick={() => setOpenModal(1)} className="mt-3 text-center cursor-pointer auth-modal-desc hover:text-[#FF8F9C]">
                                Already have an account? <b>Login In</b>
                            </p>

                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}

export default SignUpModal