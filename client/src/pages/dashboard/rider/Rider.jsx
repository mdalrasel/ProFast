import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import {
    FaUser, FaEnvelope, FaIdCard, FaPhone, FaWarehouse, FaMapMarkerAlt
} from 'react-icons/fa';
import "@lottiefiles/lottie-player";
import riderLottie from '../../../../public/animations/rider.json';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const Rider = () => {
    const regionsData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState(""); // pending | approved | rejected

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || ""
        }
    });

    const selectedRegion = watch("region");
    const filteredDistricts = regionsData
        .filter((item) => item.region === selectedRegion)
        .map((item) => item.district);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axiosSecure.get(`/riders/status?email=${user.email}`);
                setStatus(res.data?.status || "");
            } catch (err) {
                console.error("Status fetch failed", err);
            }
        };
        fetchStatus();
    }, [axiosSecure, user?.email]);

    const onSubmit = async (data) => {
        if (status === "pending" || status === "approved") return; // 🛑 prevent submit if already applied or approved

        try {
            const riderData = { ...data, status: "pending", createdAt: new Date() };
            const res = await axiosSecure.post("/riders", riderData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Your application has been submitted!", "success");
                reset({
                    nid: "",
                    contact: "",
                    region: "",
                    warehouse: ""
                });
                setStatus("pending"); // ✅ update status immediately
            }
        } catch (error) {
            console.error("Failed to submit rider application:", error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
            {/* Rider Application Status Message */}
            <div className="text-center mb-4">
                {status === "approved" && (
                    <p className="text-green-600 font-semibold text-lg">
                        ✅ You are already a verified rider!
                    </p>
                )}
                {status === "pending" && (
                    <p className="text-yellow-500 font-semibold text-sm">
                        ⏳ Your application is under review. Please wait.
                    </p>
                )}
                {status === "rejected" && (
                    <p className="text-red-500 font-semibold text-sm">
                        ❌ Your previous application was rejected. You can apply again.
                    </p>
                )}
            </div>

            <h2 className="text-3xl font-bold mb-2 text-gray-800">Be a Rider</h2>
            <p className="text-gray-600 mb-6">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name + email */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="label text-sm font-semibold">Your Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    {...register("name")}
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="input input-bordered w-full pl-10 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="label text-sm font-semibold">Your Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="email"
                                    {...register("email")}
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full pl-10 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* NID + Contact */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="label text-sm font-semibold">NID Number</label>
                            <div className="relative">
                                <FaIdCard className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    {...register("nid", { required: true })}
                                    placeholder="Your NID"
                                    className="input input-bordered w-full pl-10"
                                    disabled={status === "approved"}
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="label text-sm font-semibold">Contact</label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    {...register("contact", { required: true })}
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full pl-10"
                                    disabled={status === "approved"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Region + Warehouse */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="label text-sm font-semibold">Region</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                                <select
                                    {...register("region", { required: true })}
                                    className="select select-bordered w-full pl-10"
                                    disabled={status === "approved"}
                                >
                                    <option value="">Select your region</option>
                                    {[...new Set(regionsData.map((item) => item.region))].map((region) => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='w-full'>
                            <label className="label text-sm font-semibold">Warehouse (based on region)</label>
                            <div className="relative">
                                <FaWarehouse className="absolute left-3 top-3.5 text-gray-400" />
                                <select
                                    {...register("warehouse", { required: true })}
                                    className="select select-bordered w-full pl-10"
                                    disabled={status === "approved"}
                                >
                                    <option value="">Select warehouse</option>
                                    {filteredDistricts.map((district) => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn bg-lime-500 hover:bg-lime-600 text-white w-full mt-4"
                        disabled={status === "pending" || status === "approved"} // ✅ disable unless rejected
                    >
                        {
                            status === "approved" ? "Already Approved"
                                : status === "pending" ? "Already Applied"
                                    : "Submit"
                        }
                    </button>

                </form>

                {/* Animation */}
                <div className="hidden md:block">
                    <lottie-player autoplay loop src={riderLottie}></lottie-player>
                </div>
            </div>
        </div>
    );
};

export default Rider;
