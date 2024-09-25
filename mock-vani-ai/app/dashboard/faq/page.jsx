"use client";
import '../../styles/Dashboard.css'; // Import your CSS file for patterns
import React, { useEffect } from "react";

function Faq() {
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center px-1 py-1 min-h-[10vh] text-center bg-white text-gray-900 shadow-md">
        <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg max-w-2xl mb-4 leading-relaxed text-gray-600">
        Find answers to common questions about Mock Vani.
        </p>

        <div className="bubble-container absolute inset-0 overflow-hidden"></div>

      </section>

      {/* FAQ Section */}
      <div className="container mx-auto px-1 py-5">
        <div className="bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">FAQ</h2>
          <div className="space-y-8">
            {/* Question 1 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">What are the available plans on Mock Vani?</h3>
              <p className="text-gray-600 mt-2">
                Mock Vani offers four different plans to suit your needs:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li><strong>Almost Free Plan:</strong> Basic features for 3 months at $0.01.</li>
                <li><strong>Basic Plan:</strong> Includes some essential features at $19.99/month.</li>
                <li><strong>Pro Plan:</strong> Access to all advanced features at $49.99/month.</li>
                <li><strong>Students Plan:</strong> Full access to features for students at $2.99/month.</li>
              </ul>
            </div>

            {/* Question 2 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">What features are included in the Almost Free Plan?</h3>
              <p className="text-gray-600 mt-2">
                The Almost Free Plan offers basic features for up to 3 months, allowing you to get started with AI-powered mock interviews at a minimal cost.
              </p>
            </div>

            {/* Question 3 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">What is the Basic Plan?</h3>
              <p className="text-gray-600 mt-2">
                The Basic Plan is designed for individuals who need essential mock interview features. Priced at $19.99/month, this plan provides access to mock interviews and basic feedback.
              </p>
            </div>

            {/* Question 4 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">What does the Pro Plan offer?</h3>
              <p className="text-gray-600 mt-2">
                The Pro Plan, priced at $49.99/month, gives you access to all advanced features of Mock Vani, including personalized interview questions, detailed feedback, progress tracking, and priority support.
              </p>
            </div>

            {/* Question 5 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">What is the Students Plan?</h3>
              <p className="text-gray-600 mt-2">
                The Students Plan is specially designed for students and offers full access to all features at a discounted rate of $2.99/month. It's perfect for students preparing for job interviews.
              </p>
            </div>

            {/* Question 6 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Can I switch between plans?</h3>
              <p className="text-gray-600 mt-2">
                Yes, you can switch between plans at any time. Simply go to the "Upgrade" section in your dashboard, choose the desired plan, and complete the payment process.
              </p>
            </div>

            {/* Question 7 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">How can I upgrade my plan?</h3>
              <p className="text-gray-600 mt-2">
                To upgrade your plan, visit the "Upgrade" section in your dashboard. Select the plan that fits your needs, and you'll be directed to Stripe for a secure payment process.
              </p>
            </div>

            {/* Question 8 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Is there a free trial available?</h3>
              <p className="text-gray-600 mt-2">
                While Mock Vani does not offer a free trial, the Almost Free Plan allows you to access basic features for just $0.01, giving you a chance to try out the platform at a minimal cost.
              </p>
            </div>

            {/* Question 9 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">What happens if I cancel my subscription?</h3>
              <p className="text-gray-600 mt-2">
                You can cancel your subscription at any time. Once canceled, you'll retain access to your current plan until the end of the billing cycle, after which you'll lose access to premium features.
              </p>
            </div>

            {/* Question 10 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">How is my payment information secured?</h3>
              <p className="text-gray-600 mt-2">
                Mock Vani uses Stripe, a secure and widely trusted payment gateway, to handle all transactions. Your payment information is encrypted and securely stored by Stripe, ensuring maximum security.
              </p>
            </div>
          </div>
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

export default Faq;
