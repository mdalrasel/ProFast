import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedRiders = () => {
  const [approvedRiders, setApprovedRiders] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/riders?status=approved").then((res) => {
      setApprovedRiders(res.data);
    });
  }, [axiosSecure]);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">✅ Approved Riders</h2>
      {approvedRiders.length === 0 ? (
        <p className="text-center text-gray-500">No approved riders found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedRiders.map((rider) => (
            <li key={rider._id} className="border p-4 rounded-xl shadow hover:shadow-md transition">
              <p><strong>👤 Name:</strong> {rider.name}</p>
              <p><strong>📧 Email:</strong> {rider.email}</p>
              <p><strong>📍 Region:</strong> {rider.region}</p>
              {rider.createdAt && (
                <p><strong>🗓 Joined:</strong> {formatDate(rider.createdAt)}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApprovedRiders;
