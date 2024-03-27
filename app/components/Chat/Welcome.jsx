"use client"
import Image from "next/image";
import logo from "../../../public/logobetter.png";

function Welcome({ user, text, center = false }) {
    return (
        !center
            ? <div className={`welcome-container`}>
                <Image
                    src={logo}
                    alt="Sellorama Logo"
                    width={100} height={100}
                />
                <b>Hi{`${user?.name ? ", " + user.name : ""}`} 👋</b>
                {
                    text && <p>You haven&apos;t initiated any conversation yet!</p>
                }
            </div>

            : <div className={`flex flex-col justify-center items-center mx-auto`}>
                <Image
                    src={logo}
                    alt="Sellorama Logo"
                    width={100} height={100}
                    className="mb-2"
                />
                <b>Hi{`${user?.name ? ", " + user.name : ""}`} 👋</b>
                {
                    text && <p>You haven&apos;t initiated any conversation yet!</p>
                }
            </div>
    );
}

export default Welcome;
