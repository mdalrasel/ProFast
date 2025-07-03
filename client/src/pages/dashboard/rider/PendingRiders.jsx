import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const PendingRiders = () => {
  const [pendingRiders, setPendingRiders] = useState([]);
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();

   const fetchPending = () => {
    axiosSecure.get("/riders?status=pending").then((res) => {
      setPendingRiders(res.data);
    }).catch(err => {
        console.error("Failed to fetch pending riders", err);
        if (err.response && err.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'You do not have permission to view pending riders.',
            });
        }
    });
  };

    useEffect(() => {
    fetchPending();
  }, [axiosSecure]);

   const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/riders/status/${id}`, {
        status: "approved",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('সফল!', 'রাইডার অনুমোদিত হয়েছে।', 'success');
        fetchPending(); 
      } else {
          Swal.fire('ব্যর্থ!', 'রাইডার অনুমোদন করা যায়নি।', 'error');
      }
    } catch (err) {
      console.error("অনুমোদন ব্যর্থ:", err);
      if (err.response && err.response.status === 403) {
          Swal.fire({
              icon: 'error',
              title: 'Access Denied',
              text: 'You do not have permission to approve riders.',
          });
      } else {
          Swal.fire('ত্রুটি!', 'রাইডার অনুমোদন করতে ব্যর্থ।', 'error');
      }
    }
  };

 const handleReject = (riderId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to reject and remove this rider?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reject and remove!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/riders/status/${riderId}`, { status: 'rejected' });
                
                if (res.data.deleted) { 
                    Swal.fire(
                        'Rejected!',
                        'The rider has been rejected and removed.',
                        'success'
                    );
                } else {
                     Swal.fire(
                        'Failed!',
                        'Could not reject and remove the rider.',
                        'error'
                    );
                }
            } catch (error) {
                console.error("Error rejecting rider:", error);
                Swal.fire(
                    'Error!',
                    'There was an error rejecting the rider.',
                    'error'
                );
            }
        }
    });
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
