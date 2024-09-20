import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, onQuestionSelect }) {
    const questionsArray = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
    const activeQuestion = questionsArray[activeQuestionIndex]?.question;

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, your browser does not support text to speech');
        }
    };

    return (
        <div className="flex flex-col p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-6">Interview Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {questionsArray.length === 0 ? (
                    <p className="text-gray-600 text-lg">No questions available</p>
                ) : (
                    questionsArray.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => onQuestionSelect(index)} 
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                activeQuestionIndex === index ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            <h2 className="text-center font-semibold text-sm md:text-base">
                                Question #{index + 1}
                            </h2>
                        </div>
                    ))
                )}
            </div>

            {activeQuestion ? (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">Selected Question:</h3>
                        <Volume2 
                            className="cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-300" 
                            onClick={() => textToSpeech(activeQuestion)} 
                            size={24}
                            title="Play Question" 
                        />
                    </div>
                    <p className="text-gray-700 mt-4 text-lg">{activeQuestion}</p>
                </div>
            ) : (
                <p className="mt-8 text-gray-500 text-lg">Please select a question to view its details.</p>
            )}
            
            {/* Note Section */}
            <div className="border rounded-lg p-6 bg-blue-50 mt-6 shadow-lg">
                <h2 className="flex gap-2 items-center text-blue-900">
                    <Lightbulb size={20} />
                    <strong>Note:</strong>
                </h2>
                <p className="text-sm text-blue-700 mt-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
            </div>
        </div>
    );
}

export default QuestionsSection;
