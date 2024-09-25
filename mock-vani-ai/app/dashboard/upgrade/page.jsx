"use client";

import '../../styles/Dashboard.css'; // Import your CSS file for patterns
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import PlanData from '../../../utils/PlanData';  // Assuming PlanData exists under utils
import { Button } from '../../../components/ui/button'; // Assuming a Button component exists
import { useRouter } from 'next/navigation';

// Load your publishable Stripe key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function UpgradePage() {
    const router = useRouter();
    useEffect(() => {
        generateBubbles();
      }, []);
    
      const generateBubbles = () => {
        const container = document.querySelector(".bubble-container");
        const screenWidth = window.innerWidth;
    
        let bubbleCount, minBubbleSize, maxBubbleSize;
    
        // Adjust bubble count and sizes based on screen width
        if (screenWidth <= 480) { // Mobile screens
          bubbleCount = 5;
          minBubbleSize = 10; // Bubbles between 10px and 30px
          maxBubbleSize = 30;
        } else if (screenWidth <= 768) { // Tablet screens
          bubbleCount = 10;
          minBubbleSize = 20; // Bubbles between 20px and 50px
          maxBubbleSize = 50;
        } else { // Desktop screens
          bubbleCount = 25;
          minBubbleSize = 30; // Bubbles between 30px and 70px
          maxBubbleSize = 70;
        }
    
        for (let i = 0; i < bubbleCount; i++) {
          const bubble = document.createElement("div");
          bubble.classList.add("bubble");
          bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
          bubble.style.top = `${Math.random() * 100}%`;  // Random vertical position
          bubble.style.animationDelay = `${Math.random() * 5}s`; // Random animation delay
    
          // Generate random size between the min and max bubble sizes
          const bubbleSize = Math.random() * (maxBubbleSize - minBubbleSize) + minBubbleSize;
          bubble.style.width = `${bubbleSize}px`;
          bubble.style.height = bubble.style.width;
    
          container.appendChild(bubble);
        }
      };
    const handleUpgrade = async (plan) => {
        const stripe = await stripePromise;

        try {
            // Create a checkout session using the API
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: plan.priceId }), // Send priceId from Stripe
            });

            const session = await response.json();

            if (!session.sessionId) {
                throw new Error('Session ID not returned from API');
            }

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
                  {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-1 py-1 min-h-[10vh] text-center bg-white text-gray-900 shadow-md">
        <h1 className="text-5xl font-bold mb-4">Upgrade Your Plan</h1>
        <p className="text-lg max-w-2xl mb-4 leading-relaxed text-gray-600">
        Choose a plan that suits your needs and unlock premium features.
        </p>

        <div className="bubble-container absolute inset-0 overflow-hidden"></div>

      </section>

            {/* Plan Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {PlanData.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <div className="flex-grow">
                                <h2 className="text-2xl font-semibold text-gray-800">{plan.name}</h2>
                                <p className="mt-2 text-gray-600">{plan.description}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-3xl font-bold text-primary">${plan.price}/month</p>
                            </div>
                            <Button
                                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                                onClick={() => handleUpgrade(plan)}
                            >
                                Upgrade to {plan.name}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white py-6 mt-auto">
                <div className="container px-3 mx-auto flex justify-between items-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Mock Vani. All Rights Reserved.</p>
                    <div className="space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
                        <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
                        <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
