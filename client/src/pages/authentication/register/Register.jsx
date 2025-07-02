import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleSignIn from "../socialeLogIn/GoogleSignIn";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
     const axiosSecure = useAxiosSecure();
    const from = location.state?.from || '/';
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {

        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbApiKey = import.meta.env.VITE_imgbbApiKey;
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

        axios.post(uploadUrl, formData)
            .then(imgRes => {
                if (imgRes.data.success) {
                    const imageUrl = imgRes.data.data.url;

                    createUser(data.email, data.password)
                        .then((res) => {
                            const user = res.user;

                            updateProfile(user, {
                                displayName: data.name,
                                photoURL: imageUrl
                            })
                                .then(() => {
                                    // Save user to backend securely
                                    axiosSecure.post('/users', {
                                        name: data.name,
                                        email: data.email,
                                        image: imageUrl,
                                        role: 'user',
                                        authProvider: 'email',
                                        createdAt: new Date().toISOString() ,
                                        last_log: new Date().toISOString() 
                                    })
                                    .then(() => {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Registration Successful!",
                                            text: "Your profile has been updated successfully.",
                                            confirmButtonColor: "#3085d6"
                                        });
                                        navigate(from);
                                    })
                                    .catch(err => {
                                        console.error("Failed to save user:", err);
                                        Swal.fire({
                                            icon: "error",
                                            title: "Failed to save user data",
                                            text: err.message,
                                            confirmButtonColor: "#d33"
                                        });
                                    });
                                });
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Registration Failed",
                                text: err.message,
                                confirmButtonColor: "#d33"
                            });
                        });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Image Upload Failed",
                    text: err.message,
                    confirmButtonColor: "#d33"
                });
            });
    };

    return (
        <div className=" p-6 bg-white shadow rounded">
            <form onSubmit={handleSubmit(onSubmit)} >
                {/* Name */}
                <label className="label">Name</label>
                <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full"
                    placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                {/* Email */}
                <label className="label mt-4">Email</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                        }
                    })}
                    className="input input-bordered w-full"
                    placeholder="Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                {/* Photo URL */}
                <label className="label mt-4">Photo URL</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: "Photo is required" })}
                    className="border p-2 w-full"
                    placeholder="Profile Photo URL"
                />

                {/* Password */}
                <label className="label mt-4">Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                            message: "Must include uppercase, lowercase, and number"
                        }
                    })}
                    className="input input-bordered w-full"
                    placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                <button type="submit" className="px-6 py-2 border border-[#D8F046] font-semibold rounded-md hover:bg-[#D8F046]  mt-5 transition w-full">Register</button>
                <p>Already have an Account? <Link to='/logIn' className="text-blue-400">Login</Link></p>

            </form>
            <div className="text-center py-4">
                <p >---OR---</p>
                <GoogleSignIn />
            </div>
        </div>
    );
};

export default Register;
