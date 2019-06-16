import React, { useState } from "react";
import axios from "axios";
import { injectStripe } from "react-stripe-elements";
import StripeCheckout from "react-stripe-checkout";

function CheckoutForm(props) {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateAbbr, setStateAbbr] = useState("");
  const [zip, setZip] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const handleSubmit = async ev => {
    ev.preventDefault();
    try {
      const method = await this.props.stripe.createPaymentMethod("card", {
        billing_details: { name: "Edward Reeseg" }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onToken = async (token, address) => {
    console.log(address);
    const response = await axios.post("http://localhost:5000/charge", {
      token,
      address
    });
    console.log(response.data);
  };
  return (
    <StripeCheckout
      token={onToken}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST}
      currency="USD"
      billingAddress={true}
      zipCode={true}
    />
    // <form onSubmit={handleSubmit}>
    //   <AddressSection
    //     streetAddress={streetAddress}
    //     city={city}
    //     stateAbbr={stateAbbr}
    //     zip={zip}
    //     handlers={{ setStreetAddress, setCity, setStateAbbr, setZip }}
    //   />
    //   <CardSection
    //     cardNum={cardNum}
    //     exp={exp}
    //     cvv={cvv}
    //     handlers={{ setCardNum, setExp, setCvv }}
    //   />
    //   <button type="submit">Confirm Purchase</button>
    // </form>
  );
}

function AddressSection({ streetAddress, city, stateAbbr, zip, handlers }) {
  return (
    <>
      <input
        placeholder="Street Address"
        onChange={ev => handlers.setStreetAddress(ev.target.value)}
        value={streetAddress}
      />
      <input
        placeholder="City"
        onChange={ev => handlers.setCity(ev.target.value)}
        value={city}
      />
      <input
        placeholder="State Abbreviation"
        onChange={ev => handlers.setStateAbbr(ev.target.value)}
        value={stateAbbr}
        maxLength="2"
      />
      <input
        placeholder="Zip Code"
        onChange={ev => handlers.setZip(ev.target.value)}
        value={zip}
      />
    </>
  );
}

function CardSection({ cardNum, exp, cvv, handlers }) {
  return (
    <>
      <input
        placeholder="Card Number"
        onChange={ev => handlers.setCardNum(ev.target.value)}
        value={cardNum}
        maxLength="16"
      />
      <input
        placeholder="Expiration Date"
        onChange={ev => handlers.setExp(ev.target.value)}
        value={exp}
      />
      <input
        placeholder="CVV"
        onChange={ev => handlers.setCvv(ev.target.value)}
        value={cvv}
        maxLength="3"
      />
    </>
  );
}

export default injectStripe(CheckoutForm);
