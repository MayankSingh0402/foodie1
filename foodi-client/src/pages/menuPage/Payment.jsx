import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from '../../hooks/useCart'

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Payment = () => {
    // console.log(stripePromise);
    // console.log(import.meta.env.VITE_Stripe_PK);

    const [cart] = useCart();
    console.log(cart);

    // calculate the checkout prices
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // console.log(cartTotal);
    const totalPrice = parseFloat(cartTotal.toFixed(2));

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
