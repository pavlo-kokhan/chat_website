import { MdDeleteForever, MdEdit } from "react-icons/md";

import useDeleteUser from "../../hooks/useDeleteUser";

const StudentTable = ({ user, idx }) => {
    const { deleteUser } = useDeleteUser();

    return <tr>
        <th>
            <label>
                <input type="checkbox" className="checkbox"/>
            </label>
        </th>
        <th>{ idx }</th>
        <td>{ user.username }</td>
        <td>{ user.group }</td>
        <td>{ user.gender }</td>
        <td>{ user.date }</td>
        <td>Online</td>
        <td>
            <div className="flex justify-end">
                <button
                    className="btn btn-sm justify-self-end bg-gray-300 ml-3"
                    onClick={ () => {
                        deleteUser(user._id);
                    } }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
                    </svg>
                </button>
            </div>
        </td>
    </tr>;
};

export default StudentTable;