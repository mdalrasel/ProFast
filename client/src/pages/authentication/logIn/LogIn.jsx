import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleSignIn from "../socialeLogIn/GoogleSignIn";


const LogIn = () => {
    const { signIn } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then((result) => {
                console.log("Login successful", result.user);
                Swal.fire({
                    icon: "success",
                    title: "Welcome Back!",
                    text: "You have logged in successfully.",
                    confirmButtonColor: "#3085d6"
                });
                navigate(from);
            })
            .catch((error) => {
                console.error("Login failed:", error.message);
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: "Email is required" })} className="input" placeholder="Email" />

                    <label className="label mt-4">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                message:
                                    "Password must include at least one uppercase letter, one lowercase letter, and one number"
                            }
                        })}
                        className="input"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>Hae not an Account! please <Link to='/register' className="text-blue-500">Register</Link></p>
                </fieldset>
            </form>
            <div className="text-center py-4">
                <p >---OR---</p>
                <GoogleSignIn />
            </div>
        </div>
    );
};

export default LogIn;