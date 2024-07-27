import Stripe from 'stripe';
import { Product } from '../models/Product.models.js';
import Order from '../models/Order.models.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderCreate = async (req, res) => {
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    products,
  } = req.body;

  console.log("Received products:", products); // Log products to check structure

  try {
    // Fetch product information from the database
    const productDetails = await Promise.all(
      products.map(async (item) => {
        console.log("Processing product:", item); // Log the product ID
        // Access the correct property for the product ID
        const productInfo = await Product.findById(item.product.id); // Use 'id' here
        if (!productInfo) {
          throw new Error(`Product with id ${item.product.id} not found`); // Use 'id' here
        }
        return {
          name: productInfo.name,
          price: productInfo.price,
          quantity: item.quantity,
          description: productInfo.description,
        };
      })
    );

    // Prepare line items for Stripe
    const lineItems = productDetails.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const orderDoc = await Order.create({
      line_items: lineItems,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      Paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?cancel=1`,
      metadata: {
        orderId: orderDoc._id.toString(),
      },
    });

    res.json({
      url: session.url,
    });
    console.log("Stripe session URL:", session.url);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const ordersGet = async (req, res) => {
  const orders = await Order.find();
  res.json(orders).status(200);
};

export { orderCreate, ordersGet };
