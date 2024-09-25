import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { priceId } = req.body; // Price ID from Stripe

    try {
        console.log('Price ID received:', priceId); // Check if the priceId is received

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId, // Make sure this is a valid price ID from Stripe
                    quantity: 1,
                },
            ],
            mode: 'subscription', // or 'payment' for one-time payments
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        });

        console.log('Checkout session created:', session.id); // Log the created session ID

        // Send session ID back to frontend
        res.status(200).json({ sessionId: session.id });
    } catch (err) {
        console.error('Error creating checkout session:', err.message); // Log any errors
        res.status(500).json({ error: err.message });
    }
};
