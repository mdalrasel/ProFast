import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
            });
    }, [axiosSecure]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Registered Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Provider</th>
                            <th>Registered At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={user.image} alt="user" className="w-10 h-10 rounded-full" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.authProvider}</td>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
