import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const PaymentPage = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishable_key);
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentPage;