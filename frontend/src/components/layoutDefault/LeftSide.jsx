import { Link } from "react-router-dom";

const LeftSide = () => {
    return <div className="w-full md:w-1/4 h-full flex justify-center flex-col">

        <ul className="menu mr-3">
            <li className="text-xl">
                <Link to="/">
                    Table
                </Link>
            </li>
            <li className="text-xl">
                <Link to="/chat">
                    Chat
                </Link>
            </li>
        </ul>

    </div>;
};

export default LeftSide;