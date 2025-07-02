import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PendingRiders = () => {
  const [pendingRiders, setPendingRiders] = useState([]);
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();

  const fetchPending = () => {
    axiosSecure.get("/riders?status=pending").then((res) => {
      setPendingRiders(res.data);
    });
  };

  useEffect(() => {
    fetchPending();
  },);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/status/${id}`, {
        status: "approved",
      });

      if (res.data.modifiedCount > 0) {
        fetchPending(); // Refetch list
      }
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/status/${id}`, {
        status: "rejected",
      });

      if (res.data.modifiedCount > 0) {
        fetchPending(); // Refetch
      }
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  // const handleView = (id) => {
  //   navigate(`/dashboard/riders/${id}`);
  // };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pending Rider Requests</h2>
      <ul className="space-y-3">
        {pendingRiders.map((rider) => (
          <li key={rider._id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {rider.name}</p>
            <p><strong>Email:</strong> {rider.email}</p>
            <p><strong>Region:</strong> {rider.region}</p>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-success btn-sm" onClick={() => handleApprove(rider._id)}>Approve</button>
              <button className="btn btn-warning btn-sm" onClick={() => handleReject(rider._id)}>Reject</button>
              <button className="btn btn-info btn-sm" >View</button>


              {/* <button className="btn btn-info btn-sm" onClick={() => handleView(rider._id)}>View</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRiders;
