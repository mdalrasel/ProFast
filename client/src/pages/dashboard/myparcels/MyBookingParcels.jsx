import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyBookingParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },  
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this parcel!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then(() => {
          Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
          refetch(); // 🔄 Refresh parcel list
        });
      }
    });
  };

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map(parcel => (
              <tr key={parcel._id}>
                <td>{parcel.parcel_name}</td>
                <td>{parcel.parcel_type}</td>
                <td>৳{parcel.cost}</td>
                <td className="capitalize">{parcel.status || 'unpaid'}</td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/details/${parcel._id}`} className="text-blue-600 hover:underline">View</Link>
                  {parcel.status === 'unpaid' && (
                    <Link to={`/dashboard/payment/${parcel._id}`} className="text-green-600 hover:underline">Pay</Link>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingParcels;
