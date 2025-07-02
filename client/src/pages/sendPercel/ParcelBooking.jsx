import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaWeight,
  FaBox,
  FaClipboardList
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const ParcelBooking = () => {
  const {user}=useAuth()
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, reset } = useForm();
  const parcelType = watch('parcel_type', 'Document');
  const senderRegion = watch('sender_region');
  const receiverRegion = watch('receiver_region');
  const weight = parseFloat(watch('weight') || 0);

  const [cost, setCost] = useState(0);

  const getUniqueRegions = (data) => {
    const seen = new Set();
    return data.filter((item) => {
      if (!seen.has(item.region)) {
        seen.add(item.region);
        return true;
      }
      return false;
    });
  };

  const getDistrictsByRegion = (region) => {
    return serviceCenters.filter((item) => item.region === region);
  };

  const calculateCost = (type, weight, fromRegion, toRegion) => {
    const sameCity = fromRegion === toRegion;
    if (type === 'Document') {
      return sameCity ? 60 : 80;
    } else {
      if (weight <= 3) {
        return sameCity ? 110 : 150;
      } else {
        const extra = (weight - 3) * 40;
        return sameCity ? 110 + extra : 150 + extra + 40;
      }
    }
  };

  useEffect(() => {
    const newCost = calculateCost(parcelType, weight, senderRegion, receiverRegion);
    setCost(newCost);
  }, [parcelType, weight, senderRegion, receiverRegion]);

const onSubmit = async (data) => {
  const finalCost = calculateCost(parcelType, parseFloat(data.weight || 0), data.sender_region, data.receiver_region);

  Swal.fire({
    title: `Confirm Booking?`,
    text: `Delivery Cost: ৳${finalCost}`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Confirm & Submit',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const parcelData = {
        ...data,
        cost: finalCost,
        creation_date: new Date(),
        status: 'unpaid', 
         sender_email: user?.email,// initial status
      };

      try {
        const res = await axiosSecure.post('/parcels', parcelData);
        
        if (res.data.insertedId) {
          Swal.fire('Success!', 'Your parcel has been submitted.', 'success');
          reset();
        }
        
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  });
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto p-6 bg-white shadow rounded grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="md:col-span-2">
        <label className="block mb-1 font-semibold">Parcel Name</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaBox />
          </span>
          <input
            {...register('parcel_name', { required: true })}
            placeholder="Parcel Name"
            className="w-full pl-10 p-2 border rounded"
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block font-semibold mb-1">Parcel Type</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="Document" {...register('parcel_type')} defaultChecked />
            Document
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="Non-document" {...register('parcel_type')} />
            Non-document
          </label>
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 font-semibold">Weight (kg)</label>
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaWeight />
          </span>
          <input
            type="number"
            step="0.1"
            {...register('weight')}
            disabled={parcelType === 'Document'}
            placeholder="Weight"
            className={`w-full pl-10 p-2 border rounded ${parcelType === 'Document' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {parcelType === 'Document' && (
            <div className="absolute top-full left-0 mt-1 bg-gray-800 text-white text-xs px-2 py-1 rounded hidden group-hover:block z-10">
              ❌ Only for Non-document
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaUser />
          </span>
          <input {...register('sender_name')} placeholder="Sender Name" className="w-full pl-10 p-2 border rounded" />
        </div>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaPhoneAlt />
          </span>
          <input {...register('sender_contact')} placeholder="Sender Contact" className="w-full pl-10 p-2 border rounded" />
        </div>
        <div className="mb-2">
          <select {...register('sender_region')} className="w-full p-2 border rounded">
            <option value="">Select Region</option>
            {getUniqueRegions(serviceCenters).map((item, idx) => (
              <option key={idx} value={item.region}>{item.region}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select {...register('sender_district')} className="w-full p-2 border rounded">
            <option value="">Select Service Center</option>
            {getDistrictsByRegion(senderRegion).map((item, idx) => (
              <option key={idx} value={item.district}>{item.district}</option>
            ))}
          </select>
        </div>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaMapMarkerAlt />
          </span>
          <input {...register('sender_address')} placeholder="Sender Address" className="w-full pl-10 p-2 border rounded" />
        </div>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaClipboardList />
          </span>
          <input {...register('pickup_instruction')} placeholder="Pickup Instruction" className="w-full pl-10 p-2 border rounded" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaUser />
          </span>
          <input {...register('receiver_name')} placeholder="Receiver Name" className="w-full pl-10 p-2 border rounded" />
        </div>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaPhoneAlt />
          </span>
          <input {...register('receiver_contact')} placeholder="Receiver Contact" className="w-full pl-10 p-2 border rounded" />
        </div>
        <div className="mb-2">
          <select {...register('receiver_region')} className="w-full p-2 border rounded">
            <option value="">Select Region</option>
            {getUniqueRegions(serviceCenters).map((item, idx) => (
              <option key={idx} value={item.region}>{item.region}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select {...register('receiver_district')} className="w-full p-2 border rounded">
            <option value="">Select Service Center</option>
            {getDistrictsByRegion(receiverRegion).map((item, idx) => (
              <option key={idx} value={item.district}>{item.district}</option>
            ))}
          </select>
        </div>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaMapMarkerAlt />
          </span>
          <input {...register('receiver_address')} placeholder="Receiver Address" className="w-full pl-10 p-2 border rounded" />
        </div>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaClipboardList />
          </span>
          <input {...register('delivery_instruction')} placeholder="Delivery Instruction" className="w-full pl-10 p-2 border rounded" />
        </div>
      </div>

      <div className="md:col-span-2 text-center mt-4">
        <p className="font-semibold text-gray-600 mb-2">💰 Estimated Cost: ৳{cost}
        </p>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
        >
          Send Parcel
        </button>
      </div>
    </form>
  );
};

export default ParcelBooking;
