import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return <li
        className={ `cursor-pointer
        ${ isSelected ? "rounded-md bg-gray-500" : "" }
      ` }
        onClick={ () => setSelectedConversation(conversation) }
    >
        <div>

            <div className={ `avatar ${ isOnline ? "online" : "" }` }>
                <div className="w-12 rounded-full">
                    <img
                        src={ conversation.profilePic }
                        alt="user avatar"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between items-center">
                    <p className="font-bold text-gray-300">{ conversation.username }</p>
                </div>
            </div>

        </div>
    </li>;
};

export default Conversation;