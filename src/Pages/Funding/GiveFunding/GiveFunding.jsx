import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NqI9XGPhbsSwWuKBttccqNPnaJcu4HTczY4KoGpUXiQGrnn2a1lenqGvN1el8j9gRijMMZ1hb0Wad5NVWw6OWzu00mI3FuAFx');

const GiveFunding = () => {
    return (
        <div>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>Give Funding</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default GiveFunding;