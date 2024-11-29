import React, { useState } from "react";
import { Filter } from "bad-words";
import QuestionSection from "./QuestionSection";
import SuccessModal from "./SuccessModal";
import "../styles/FormPage.css";

export default function FormPage() {
    const [formData, setFormData] = useState({
        email: "",
        askedQuestion: {
            question: "",
            industry: "",
            company: "",
            designation: "",
            yearsExperience: "",
            year: "",
        },
        receivedQuestion: {
            question: "",
            industry: "",
            company: "",
            designation: "",
            yearsExperience: "",
            year: "",
        },
        receiveUpdates: false,
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const filter = new Filter();

        // Check for profanity
        if (
            filter.isProfane(formData.askedQuestion.question) ||
            filter.isProfane(formData.askedQuestion.industry) ||
            filter.isProfane(formData.askedQuestion.company) ||
            filter.isProfane(formData.askedQuestion.designation) ||
            filter.isProfane(formData.receivedQuestion.question) ||
            filter.isProfane(formData.receivedQuestion.industry) ||
            filter.isProfane(formData.receivedQuestion.company) ||
            filter.isProfane(formData.receivedQuestion.designation)
        ) {
            alert("Your submission contains inappropriate language. Please revise it.");
            return;
        }

        // Check for valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        console.log("Form data being submitted:", formData);
        try {
            const response = await fetch("http://localhost:4000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send form data as JSON
            });
    
            if (response.ok) {
                console.log("Data submitted successfully:", formData);
                setIsSuccessModalOpen(true); // Show success modal
            } else {
                console.error("Failed to submit data:", response.statusText);
                alert("There was an error submitting your data. Please try again.");
            }
        } catch (error) {
            console.error("Error while submitting data:", error);
            alert("An unexpected error occurred. Please check your network connection and try again.");
        }
    };

    return (
        <div className="form-page">
            <header className="form-header">
                <h1>Tell Us Your Interview Battle Stories!</h1>
                <p>The questions that made you sweat, laugh, or just think, “Oh wow!”</p>
            </header>

            <main className="form-container">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        {/* Mission Introduction */}
                        <div className="form-intro">
                            <p>
                                In a world where technology evolves faster than ever, the skills and knowledge required to thrive are constantly being redefined. Today's interviews demand more than just fundamentals—they challenge us to adapt and innovate.
                            </p>
                            <p>
                                Join us in this collective effort to capture the pulse of innovation and shape the future of interview preparation!
                            </p>
                        </div>

                        {/* Email Section */}
                        <div className="form-section-inline">
                            <label className="form-label-inline">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Drop your email here"
                                className="form-input-inline"
                                required
                            />
                        </div>

                        {/* Interviewer Section */}
                        <QuestionSection
                            title="As an Interviewer"
                            description="What’s the cleverest, smartest, or downright sneaky question you’ve asked a candidate?"
                            section="askedQuestion"
                            data={formData.askedQuestion}
                            onChange={handleChange}
                        />

                        {/* Interviewee Section */}
                        <QuestionSection
                            title="As an Interviewee"
                            description="Remember that one question that made you question everything in your life decisions? We want to know it!"
                            section="receivedQuestion"
                            data={formData.receivedQuestion}
                            onChange={handleChange}
                        />

                        {/* Receive Updates */}
                        <div className="form-section form-updates">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.receiveUpdates}
                                    onChange={(e) => setFormData({ ...formData, receiveUpdates: e.target.checked })}
                                />
                                Would you like to stay in the loop with our witty insights?
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions">
                            <button type="submit" className="submit-button">
                                Submit Responses
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="form-footer">
                <p>&copy; {new Date().getFullYear()} Mock Vani. All rights reserved.</p>
            </footer>

            {isSuccessModalOpen && (
                <SuccessModal
                    message="Thanks, you absolute legend! Your battle story has been recorded for the Hall of Fame!"
                    onClose={() => setIsSuccessModalOpen(false)}
                />
            )}
        </div>
    );
}
