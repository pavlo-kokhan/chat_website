import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversation();

    return <div className="menu w-full">
        { conversations.map((conversation) => (
            <Conversation
                key={ conversation._id }
                conversation={ conversation }
            />
        )) }

        { loading ? <span className="loading loading-spinner"></span> : null }
    </div>;
};

export default Conversations;