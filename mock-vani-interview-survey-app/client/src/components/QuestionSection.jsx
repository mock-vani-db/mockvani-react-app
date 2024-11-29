import React from "react";
import FormField from "./FormField";
import "../styles/QuestionSection.css";

export default function QuestionSection({ title, description, section, data, onChange }) {
  return (
    <div className="question-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>

      {/* Question Field */}
      <FormField label="What is the most interesting interview question?">
        <textarea
          value={data.question}
          onChange={(e) => onChange(section, "question", e.target.value)}
          placeholder="Share the question that stood out the most!"
          className="form-input"
          required
        />
      </FormField>

      {/* Grid for Additional Details */}
      <div className="form-grid">
        <FormField label="Industry">
          <input
            type="text"
            value={data.industry}
            onChange={(e) => onChange(section, "industry", e.target.value)}
            placeholder="e.g., Technology"
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Company">
          <input
            type="text"
            value={data.company}
            onChange={(e) => onChange(section, "company", e.target.value)}
            placeholder="e.g., Mock Vani"
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Designation">
          <input
            type="text"
            value={data.designation}
            onChange={(e) => onChange(section, "designation", e.target.value)}
            placeholder="e.g., Software Engineer"
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Years of Experience">
          <input
            type="number"
            value={data.yearsExperience}
            onChange={(e) => onChange(section, "yearsExperience", e.target.value)}
            placeholder="e.g., 5"
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Year">
          <input
            type="number"
            value={data.year}
            onChange={(e) => onChange(section, "year", e.target.value)}
            placeholder="e.g., 2023"
            className="form-input"
            required
          />
        </FormField>
      </div>
    </div>
  );
}
