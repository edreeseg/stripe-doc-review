const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const stripe = require('./stripe-helpers');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.post('/subscribe', async (req, res) => {
  try {
    const { token, address } = req.body;
    const owner = {
      name: address.billing_name,
      address: {
        line1: address.billing_address_line1,
        city: address.billing_address_city,
        postal_code: address.billing_address_zip,
        country: address.billing_address_country_code,
      },
      email: token.email,
    };
    const customer = await stripe.createCustomer(owner);
    const source = await stripe.createSource(token.id, owner);
    const added = await stripe.addSourceToCustomer(customer.id, source.id);
    const subscription = await stripe.createSubscription(
      customer.id,
      process.env.STRIPE_PLAN_ID_TEST
    ); // Grab subscriptions ID and save it to the users table
    res.status(201).json({ subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/subscribe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cancelled = await stripe.cancelSubscription(id);
    res.json({ cancelled });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
