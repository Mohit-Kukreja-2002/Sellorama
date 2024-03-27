import { useState } from "react";
import io from "socket.io-client";

const useInitiateConnection = () => {
    const [socket, setSocket] = useState(null);

    async function initiateConnection(user) {
        const newSocket = await io(process.env.NEXT_PUBLIC_SOCKET_URL, {
            query: {
                userId: user._id,
            },
        });
        setSocket(newSocket);
        return newSocket;
    }

    function closeConnection() {
        console.log(socket); // This may show null due to asynchronous nature of state updates
        if (socket) {
            socket.disconnect(); // Disconnect the socket
            console.log("Socket disconnected");
            setSocket(null); // Update the socket state
        }
    }

    return { socket, initiateConnection, closeConnection };
};

export default useInitiateConnection;
