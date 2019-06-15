import React, { PureComponent } from "react";
import { injectStripe } from "react-stripe-elements";

class CheckoutForm extends PureComponent {
  handleSubmit = async ev => {
    ev.preventDefault();
    try {
      const method = await this.props.stripe.createPaymentMethod("card", {
        billing_details: { name: "Edward Reeseg" }
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

export default CheckoutForm;
