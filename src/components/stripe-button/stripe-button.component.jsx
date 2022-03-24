import React from "react";
import StripeCheckout from 'react-stripe-checkout';



const StripeCheckoutButton = ( { price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KgCqLBa10DB4QEITlhXkemtNJZsKETUAh098fo4DikNcKaZL2Hb6RrtBaSfW4GRtqOh6a8aDNg16xSib616z6KO00GFXalYSC';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;