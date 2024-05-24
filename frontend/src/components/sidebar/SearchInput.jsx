import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [ search, setSearch ] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!search) return;

        const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("Not such user found!");
        }
    };

    return <form
        onSubmit={ handleSubmit }
        className="flex items-center gap-2"
    >
        <input
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
            type="text"
            placeholder="Search..."
            className="w-full input bg-gray-800 h-10 py-4"
        />
        <button type="submit" className="btn bg-gray-800">
            {/*<IoSearchSharp className="w-6 h-6 outline-none"/>*/ }
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M11 12q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m0-2q.825 0 1.413-.587T13 8t-.587-1.412T11 6t-1.412.588T9 8t.588 1.413T11 10m10.4 12.8l-2.5-2.5q-.525.3-1.125.5T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .675-.2 1.275t-.5 1.125l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275M16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19M3 18v-.775q0-.85.425-1.575t1.175-1.1q1.05-.55 2.338-.962t2.637-.538q.425-.05.725.25t.3.725t-.3.738t-.725.362q-1.425.175-2.4.525t-1.65.7q-.25.125-.387.363T5 17.225V18h4.6q.425 0 .713.288T10.6 19t-.287.713T9.6 20H5q-.825 0-1.412-.587T3 18m7.175 0"/>
            </svg>
        </button>
    </form>;
};

export default SearchInput;