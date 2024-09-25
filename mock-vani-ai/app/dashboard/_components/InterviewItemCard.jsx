// InterviewItemCard.js
import React from 'react';

function InterviewItemCard({ interview, annotation }) {
  return (
    <div className="border shadow-lg rounded-lg p-3">
      <h3 className="text-lg font-semibold text-primary">{interview?.jobPosition}</h3>
      <p className="text-gray-500">Experience: {interview?.jobExperience} years</p>
      <h4 className="text-xs text-gray-500">Interview Date: {interview?.createdAt}</h4>

      {/* Annotation for Completed or Incomplete */}
      {annotation && (
        <p className={`mt-2 text-sm font-bold ${annotation === "Completed" ? "text-green-600" : "text-red-600"}`}>
          {annotation}
        </p>
      )}
    </div>
  );
}

export default InterviewItemCard;
