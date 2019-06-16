const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);

const createProduct = async () => {
  try {
    const product = await stripe.products.create({
      name: 'Contractor Scheduler',
      type: 'service',
    });
    return product;
  } catch (err) {
    console.log(err);
  }
};

const createPlan = async product => {
  try {
    const plan = await stripe.plans.create({
      product,
      currency: 'usd',
      interval: 'month',
      amount: '1000',
    });
    return plan;
  } catch (err) {
    console.log(err);
  }
};

const ownerInfo = {
  name: 'Edward Reeseg',
  address: {
    line1: '803 Bryant St.',
    city: 'Rahway',
    postal_code: '07065',
    country: 'US',
  },
  email: 'edward.reeseg@gmail.com',
};

const createCustomer = async info => {
  try {
    const customer = await stripe.customers.create(info);
    return customer;
  } catch (error) {
    console.log(error);
  }
};

const createSubscription = async (customer, plan = 'plan_FFqp2OIxO2sfEd') => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer,
      items: [{ plan }],
    });
    return subscription;
  } catch (err) {
    console.log(err);
  }
};

const createSource = async (token, owner) => {
  try {
    const source = await stripe.sources.create({
      type: 'card',
      token,
      owner,
    });
    return source;
  } catch (error) {
    console.log(error);
  }
};

const createPaymentIntent = async customer => {
  const instance = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    customer,
  });
  return instance;
};

const createPaymentMethod = async card => {
  const method = stripe.paymentMethods.create({
    type: 'card',
    card, // number, exp_month, exp_year, cvc keys
  });
  return method;
};

const createCharge = async token => {
  try {
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      source: token,
    });
    return charge;
  } catch (err) {
    console.log(err);
  }
};

const addSourceToCustomer = async (customer, source) => {
  try {
    const added = await stripe.customers.createSource(customer, {
      source,
    });
    return added;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCustomer,
  createPlan,
  createProduct,
  createSubscription,
  createSource,
  createPaymentIntent,
  createPaymentMethod,
  addSourceToCustomer,
  createCharge,
  ownerInfo,
};
