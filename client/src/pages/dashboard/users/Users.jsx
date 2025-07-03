import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        axiosSecure.get('/users') 
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
                if (err.response && err.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Access Denied',
                        text: 'You do not have permission to view all users.',
                    });
                }
                setLoading(false);
            });
    };

   useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `${user.name} কে কি আপনি অ্যাডমিন করতে চান?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, অ্যাডমিন করুন!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/admin/${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: 'সফল!',
                            text: `${user.name} এখন একজন অ্যাডমিন!`,
                            icon: 'success'
                        });
                        fetchUsers(); 
                    } else {
                        Swal.fire('ব্যর্থ!', 'ব্যবহারকারীকে অ্যাডমিন করা যায়নি।', 'error');
                    }
                } catch (error) {
                    console.error('অ্যাডমিন করতে ব্যর্থ:', error);
                    if (error.response && error.response.status === 403) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Access Denied',
                            text: 'You do not have permission to perform this action.',
                        });
                    } else {
                        Swal.fire('ত্রুটি!', 'ব্যবহারকারীকে অ্যাডমিন করতে ব্যর্থ।', 'error');
                    }
                }
            }
        });
    };

    if (loading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
         <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">সকল নিবন্ধিত ব্যবহারকারী</h2>
            {users.length === 0 ? (
                <p className="text-center text-gray-500">কোনো ব্যবহারকারী পাওয়া যায়নি।</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ছবি</th>
                                <th>নাম</th>
                                <th>ইমেইল</th>
                                <th>রোল</th>
                                <th>প্রোভাইডার</th>
                                <th>নিবন্ধিত তারিখ</th>
                                <th>অ্যাকশন</th> {/* অ্যাকশনের জন্য নতুন কলাম */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={user.image || 'https://placehold.co/40x40/cccccc/ffffff?text=User'} alt="user" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.authProvider}</td>
                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <span className="text-green-600 flex items-center gap-1">
                                                <FaUserShield /> অ্যাডমিন
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-sm btn-primary"
                                            >
                                                অ্যাডমিন করুন
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Users;
