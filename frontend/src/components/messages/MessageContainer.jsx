import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [ setSelectedConversation ]);

    return <div className="w-full flex flex-col border border-gray-5 ml-5 p-5">
        { !selectedConversation ? (
            <NoChatSelected/>
        ) : (
            <>
                <div className="mb-5">
                    To user: <span
                    className="text-gray-100 p-2">{ selectedConversation.username }</span>
                </div>

                <Messages/>
                <MessageInput/>
            </>
        ) }
    </div>;
};

const NoChatSelected = () => {
    const { authUser } = useAuthContext();

    return <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
            <p>Welcome <span className="text-blue-300">{ authUser.username }</span></p>
            <p>Select a chat to start messaging</p>
        </div>
    </div>;
};

export default MessageContainer;

