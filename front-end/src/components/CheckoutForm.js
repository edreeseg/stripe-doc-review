import React, { PureComponent, useState } from 'react';
import { injectStripe } from 'react-stripe-elements';

class CheckoutForm extends PureComponent {
  handleSubmit = async ev => {
    ev.preventDefault();
    try {
      const method = await this.props.stripe.createPaymentMethod('card', {
        billing_details: { name: 'Edward Reeseg' },
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <AddressSection />
        <CardSection />
        <button type="submit">Confirm Purchase</button>
      </form>
    );
  }
}

function AddressSection(props) {
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateAbbr, setStateAbbr] = useState('');
  const [zip, setZip] = useState('');
  return (
    <>
      <input
        placeholder="Street Address"
        onChange={ev => setStreetAddress(ev.target.value)}
        value={streetAddress}
      />
      <input
        placeholder="City"
        onChange={ev => setCity(ev.target.value)}
        value={city}
      />
      <input
        placeholder="State Abbreviation"
        onChange={ev => setStateAbbr(ev.target.value)}
        value={stateAbbr}
        maxLength="2"
      />
      <input
        placeholder="Zip Code"
        onChange={ev => setZip(ev.target.value)}
        value={zip}
      />
    </>
  );
}

function CardSection(props) {
  const [cardNum, setCardNum] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <>
      <input
        placeholder="Card Number"
        onChange={ev => setCardNum(ev.target.value)}
        value={cardNum}
      />
      <input
        placeholder="Expiration Date"
        onChange={ev => setExp(ev.target.value)}
        value={exp}
      />
      <input
        placeholder="CVV"
        onChange={ev => setCvv(ev.target.value)}
        value={cvv}
      />
    </>
  );
}

export default CheckoutForm;
