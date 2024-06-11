import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import useAxiosPublic from '../../../hook/useAxiosPublic';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic()
  const [clientSecret, setClientSecret] = useState("");
  const {user} = useContext(AuthContext);
  const {amount} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axiosPublic.post('/create-payment-intent', {price: amount})
     .then(res=>{
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret)
     })
  }, [amount, axiosPublic]);


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();


    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

     // confirm payment
  const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret,
    {
      payment_method:{
        card: card,
        billing_details:{
          email:user?.email,
          name:user?.displayName
        }
      }
    })

    if(confirmError){
      console.log(confirmError);
    }else{
      console.log("Payment intent",paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        const payment = {
          email: user?.email,
          name:user?.displayName,
          transactionId: paymentIntent.id,
          amount:parseInt(amount),
          date: moment().format("MMM Do YY")
        }

        axiosPublic.post('/payment', payment)
        .then(res=>{
          if(res.data.insertedId){
            Swal.fire({
              title: "Payment Successful!",
              text: `You Transaction Id: ${paymentIntent.id}!`,
              icon: "success"
            }).then(()=>{
              navigate('/funding')
            })
            ;
          }
        })
      }
    }

  };

 

  return (
    <form className='lg:max-w-3xl lg:mx-auto  mx-4' onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      
      <div className='text-center mt-4'>
        <p className='my-4'>Amount: ${amount}</p>
        <button disabled={!stripe || !clientSecret } className='btn btn-success text-white' type="submit">
          Give Fund
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;