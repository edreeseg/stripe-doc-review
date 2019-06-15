import React, { PureComponent } from "react";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

class MyStoreCheckout extends PureComponent {
  render() {
    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
