import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBox, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaClipboardList, FaWeight, FaDollarSign, FaArrowLeft } from 'react-icons/fa';

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  

  const { data: parcel, isLoading } = useQuery({
    queryKey: ['parcel', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!parcel) return <p className="p-4 text-red-600">Parcel not found!</p>;

  return (
   <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">📦 Parcel Details</h2>

      {/* Parcel Info */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-8 shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
          <FaBox /> Parcel Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <p><span className="font-semibold">Name:</span> {parcel.parcel_name}</p>
          <p><span className="font-semibold">Type:</span> {parcel.parcel_type}</p>
          {parcel.weight && (
            <p className="flex items-center gap-1">
              <FaWeight className="text-gray-500" /> <span className="font-semibold">Weight:</span> {parcel.weight} kg
            </p>
          )}
          <p className="flex items-center gap-1">
            <FaDollarSign className="text-green-600" /> <span className="font-semibold">Cost:</span> ৳{parcel.cost}
          </p>
          <p><span className="font-semibold">Status:</span> <span className="capitalize">{parcel.status || 'unpaid'}</span></p>
          <p><span className="font-semibold">Created On:</span> {new Date(parcel.creation_date).toLocaleString()}</p>
        </div>
      </div>

      {/* Sender & Receiver Info Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sender Info */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-800">
            <FaUser /> Sender Information
          </h3>
          <p className="flex items-center gap-2 mb-2">
            <FaUser className="text-yellow-600" /> <span className="font-semibold">Name:</span> {parcel.sender_name}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-yellow-600" /> <span className="font-semibold">Contact:</span> {parcel.sender_contact}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-yellow-600" /> <span className="font-semibold">Region:</span> {parcel.sender_region}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-yellow-600" /> <span className="font-semibold">District:</span> {parcel.sender_district}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaClipboardList className="text-yellow-600" /> <span className="font-semibold">Address:</span> {parcel.sender_address}
          </p>
          <p className="flex items-center gap-2 mb-0">
            <FaClipboardList className="text-yellow-600" /> <span className="font-semibold">Pickup Instruction:</span> {parcel.pickup_instruction || 'N/A'}
          </p>
        </div>

        {/* Receiver Info */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-800">
            <FaUser /> Receiver Information
          </h3>
          <p className="flex items-center gap-2 mb-2">
            <FaUser className="text-green-600" /> <span className="font-semibold">Name:</span> {parcel.receiver_name}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-green-600" /> <span className="font-semibold">Contact:</span> {parcel.receiver_contact}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-green-600" /> <span className="font-semibold">Region:</span> {parcel.receiver_region}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-green-600" /> <span className="font-semibold">District:</span> {parcel.receiver_district}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaClipboardList className="text-green-600" /> <span className="font-semibold">Address:</span> {parcel.receiver_address}
          </p>
          <p className="flex items-center gap-2 mb-0">
            <FaClipboardList className="text-green-600" /> <span className="font-semibold">Delivery Instruction:</span> {parcel.delivery_instruction || 'N/A'}
          </p>
        </div>
      </div>
       <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
    </div>
  );
};

export default ParcelDetails;
