import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Clase Piano",
            },
            currency: "usd",
            unit_amount: 200,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "Clase Ingles",
            },
            currency: "usd",
            unit_amount: 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "Clase Matematicas",
            },
            currency: "usd",
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log(session);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
