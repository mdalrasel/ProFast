import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const GoogleSignIn = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const axiosSecure = useAxiosSecure();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log("Google Login Success:", user);

                // Save user data to backend securely
                axiosSecure.post('/users', {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    role: 'user',
                    authProvider: 'google',
                    createdAt: new Date().toISOString(),
                    last_log: new Date().toISOString()
                })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Login Successful",
                            text: `Welcome ${user.displayName}`,
                            confirmButtonColor: "#3085d6"
                        });
                        navigate(from);
                    })
                    .catch(error => {
                        console.error("Failed to save Google user:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Failed to save user data",
                            text: error.message,
                            confirmButtonColor: "#d33"
                        });
                    });
            })
            .catch(error => {
                console.error("Google Login Error:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                    confirmButtonColor: "#d33"
                });
            });
    };


    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default GoogleSignIn;
