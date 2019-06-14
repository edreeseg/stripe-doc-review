require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createProduct = async () => {
  try {
    const product = await stripe.products.create({
      name: "Contractor Scheduler",
      type: "service"
    });
    return product.id;
  } catch (err) {
    console.log(err);
  }
};

const createPlan = async () => {
  const product = await createProduct();
  const plan = await stripe.plans.create({
    product,
    nickname: "Subscription",
    currency: "usd",
    interval: "month",
    amount: "1000"
  });
  return plan;
};

const ownerInfo = {
  name: "Edward Reeseg",
  address: {
    line1: "803 Bryant St.",
    city: "Rahway",
    postal_code: "07065",
    country: "US"
  },
  email: "edward.reeseg@gmail.com"
};

const createCustomer = async () => {
  try {
    const customer = await stripe.customers.create(ownerInfo);
    return customer;
  } catch (error) {
    console.log(error);
  }
};

const createSource = async (card, ownerInfo) => {
  try {
    return await stripe.sources.create(
      {
        type: "sepa_debit",
        sepa_debit: { iban: "DE89370400440532013000" },
        currency: "usd",
        owner: {
          name: ownerInfo.name
        }
      },
      (error, source) => {
        if (error) {
          throw new Error(error);
        }
        return source;
      }
    );
  } catch (error) {
    console.log(error);
  }
};

createCustomer()
  .then(plan => console.log(plan))
  .catch(err => console.log(err));
