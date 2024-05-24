import useGetTable from "../../hooks/useGetTable";
import StudentTable from "./StudentTable";

const StudentsTable = () => {
    const { users } = useGetTable();

    return <div>

        <div className="overflow-x-auto">
            <table className="table text-base">

                <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox"/>
                        </label>
                    </th>
                    <th className="p-6">№</th>
                    <th className="p-6">Username</th>
                    <th className="p-6">Group</th>
                    <th className="p-6">Gender</th>
                    <th className="p-6">Birth Date</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Tools</th>
                </tr>
                </thead>
                <tbody>

                { users.map((user, idx) => (
                    <StudentTable
                        key={ idx }
                        user={ user }
                        idx={ idx + 1 }
                    />
                )) }


                </tbody>
            </table>
        </div>

    </div>;
};

export default StudentsTable;