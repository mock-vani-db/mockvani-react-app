import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "../styles/InsightsPage.css";

// Register all required elements and scales
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function InsightsPage() {
    const [insights, setInsights] = useState({
        totalSubmissions: 0,
        industrySpread: [],
        topCompanies: [],
        topQuestions: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInsights() {
            try {
                const response = await fetch("http://localhost:4000/insights");
                if (!response.ok) {
                    throw new Error("Failed to fetch insights");
                }
                const data = await response.json();
                setInsights(data);
            } catch (error) {
                console.error("Error fetching insights:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchInsights();
    }, []);

    if (loading) return <div>Loading insights...</div>;
    if (!insights) return <div>Failed to load insights.</div>;

    // Prepare data for charts
    const industryLabels = insights.industrySpread.map((item) => item.InterviewForIndustry);
    const industryCounts = insights.industrySpread.map((item) => item.count);

    const companyLabels = insights.topCompanies.map((item) => item.InterviewForCompany);
    const companyCounts = insights.topCompanies.map((item) => item.count);

    return (
        <div className="insights-page">
            <header className="form-header">
                <h1>Interview Insights</h1>
                <p>A deep dive into the questions, industries, and companies shaping interviews!</p>
            </header>

            <main className="form-container">
                <div className="form-card">
                    <div className="insight">
                        <h2>Total Submissions</h2>
                        <p className="insight-value">{insights.totalSubmissions}</p>
                    </div>
                    <div className="form-grid">
                        <div className="insight">
                            <h2>Industry Spread</h2>
                            <div className="chart-container">
                                <Pie
                                    key={`industry-${industryLabels.join(",")}`} // Unique key
                                    data={{
                                        labels: industryLabels,
                                        datasets: [
                                            {
                                                label: "Submissions by Industry",
                                                data: industryCounts,
                                                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                                            },
                                        ],
                                    }}
                                    options={{
                                        maintainAspectRatio: true, // Enable aspect ratio maintenance
                                        responsive: true,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="insight">
                            <h2>Top Companies</h2>
                            <div className="chart-container">
                                <Bar
                                    key={`companies-${companyLabels.join(",")}`} // Unique key
                                    data={{
                                        labels: companyLabels,
                                        datasets: [
                                            {
                                                label: "Submissions by Company",
                                                data: companyCounts,
                                                backgroundColor: "#4A90E2",
                                            },
                                        ],
                                    }}
                                    options={{
                                        maintainAspectRatio: true, // Enable aspect ratio maintenance
                                        responsive: true,
                                        scales: {
                                            x: {
                                                beginAtZero: true,
                                            },
                                            y: {
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="insight">
                        <h2>Most Interesting Questions</h2>
                        <ul className="insight-list">
                            {insights.topQuestions?.map((question, index) => (
                                <li key={index} className="insight-list-item">
                                    "{question.InterestingQuestionAsked}" from {question.InterviewForCompany}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="form-footer">
                <p>&copy; {new Date().getFullYear()} Mock Vani. All rights reserved.</p>
            </footer>
        </div>
    );
}
