import React, { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';

const amplifyClient = generateClient({
    authMode: 'userPool',
});

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hello! Need any help with books?' }
    ]);
    const [userInput, setUserInput] = useState('');  // User Input
    const [isLoading, setIsLoading] = useState(false);  // Loading state

    const { user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    const toggleChat = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setIsOpen(!isOpen);
    };


    const sendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;   // If the input is empty, return

        const userMsg = { from: 'user', text: userInput };  // User message
        setMessages((prev) => [...prev, userMsg]);   // Add user message to the chat window

        setIsLoading(true);   // Set loading state to true

        try {
            const { data, errors } = await amplifyClient.queries.askBedrock({
                userMessage: userInput,
            });

            if (errors) {
                console.error(errors);
                setMessages((prev) => [
                    ...prev,
                    { from: 'bot', text: 'Something went wrong with AI...' }
                ]);   // If there is an error, add a message to the chat window
            } else {
                const reply = data?.body || 'No response from AI...';
                setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
            } // If there is no error, add the AI response to the chat window
        } catch (err) {
            console.error('Bedrock request failed:', err);
            setMessages((prev) => [
                ...prev,
                { from: 'bot', text: 'Oops, an error occurred.' }
            ]);
        } finally {
            setIsLoading(false);
            setUserInput('');
        }
    };

    return (
        <>
            <button className="chatbot-toggle" onClick={toggleChat}>
                AI Chatbot
            </button>
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">CozyRead AI</div>
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chatbot-msg ${msg.from}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chatbot-msg bot">
                                Generating AI response...
                            </div>
                        )}
                    </div>
                    <form className="chatbot-input" onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Chatbot;
