import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { parcelId } = useParams();

  const { data: parcelInfo, isLoading } = useQuery({
    queryKey: ['checkout-parcel', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data
    }
  })
  if (isLoading) {
    return <p className="text-center py-10">loading...</p>
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const res = await axiosSecure.post('/create-payment-intent', {
      amount: parcelInfo.cost * 100,
    })
    const clientSecret = res.data.clientSecret;

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || '',
          email: user?.email || ''
        }
      }
    })

    if (error) {
      Swal.fire('Payment Failed', error.message, 'error');
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentDate = {
        parcelId,
        transactionId: paymentIntent.id,
        amount: parcelInfo.cost,
        email: user?.email,
        date: new Date(),
        status: paymentIntent.status,
      }
      
      await axiosSecure.post('/payments', paymentDate); 
      Swal.fire('Payment Successful', 'Your payment has been completed!', 'success');
    }

  };

  return (
    <div className=" ">
      <form
        onSubmit={handleSubmit}
        className="w-2/3 mx-auto mt-20   p-6  shadow-md rounded"
      >
        <h2 className="text-xl font-bold mb-4">Pay</h2>

        {/* ✅ Customer Info */}
        <div className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
          <h3 className="text-md font-semibold mb-1">Customer Info</h3>
          <p><span className="font-medium">Name:</span> {user?.displayName || 'N/A'}</p>
          <p><span className="font-medium">Email:</span> {user?.email || 'N/A'}</p>
        </div>

        {/* ✅ Card Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Card Information</label>
          <div className="border border-gray-300 rounded-md px-3 py-4 min-h-[60px]">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#fa755a',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* ✅ Pay Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={!stripe || !elements}
        >
          $ {parcelInfo?.cost} Pay Now
        </button>
      </form>
    </div>


  );
};

export default CheckoutForm;
