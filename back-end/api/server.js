const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const stripe = require("./stripe-helpers");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.post("/charge", async (req, res) => {
  try {
    const { token, address } = req.body;
    const owner = {
      name: address.billing_name,
      address: {
        line1: address.billing_address_line1,
        city: address.billing_address_city,
        postal_code: address.billing_address_zip,
        country: address.billing_address_country_code
      },
      email: token.email
    };
    const customer = await stripe.createCustomer(owner);
    const source = await stripe.createSource(token.id, owner);
    console.log(source);
    const testProduct = await stripe.createProduct();
    const testPlan = await stripe.createPlan(testProduct.id);
    // const subscription = await stripe.createSubscription(
    //   customer.id,
    //   testPlan.id
    // );
    res.send("test");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// billing_address_city: "Rahway"
// billing_address_country: "United States"
// billing_address_country_code: "US"
// billing_address_line1: "803 Bryant St."
// billing_address_state: "NJ"
// billing_address_zip: "07065"
// billing_name: "Edward Reeseg"

module.exports = app;
