import React, { useState, useEffect } from 'react';

export default function Home() {
    // Define available time slots for each team
    const teamTimeSlots = {
        team1: [
            { id: 'monday-20:00-22:00', label: 'Monday, 20:00 - 22:00' },
            { id: 'wednesday-18-20', label: 'Wednesday, 18:00 - 20:00' },
            { id: 'friday-20-22', label: 'Friday, 20:00 - 22:00' }
        ],
        team2: [
            { id: 'monday-18-20', label: 'Monday, 18:00 - 20:00' },
            { id: 'wednesday-20-22', label: 'Wednesday, 20:00 - 22:00' },
            { id: 'friday-18-20', label: 'Friday, 18:00 - 20:00' },
            { id: 'friday-18-20', label: 'Friday, 20:00 - 22:00' }
        ]
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        team: '',
        timeSlot: ''
    });
    const [submitStatus, setSubmitStatus] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nextUrl, setNextUrl] = useState('');

    // Set the next URL for FormSubmit and check URL parameters for form submission status
    useEffect(() => {
        // Set the next URL for FormSubmit (client-side only)
        setNextUrl(`${window.location.origin}?success=true`);

        // Check URL parameters to detect form submission status
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            setSubmitStatus('Message sent successfully!');
            setIsSubmitted(true);
            // Clear form data after successful submission
            setFormData({ name: '', email: '', message: '', team: '', timeSlot: '' });
        } else if (urlParams.has('error')) {
            setSubmitStatus('An error occurred while sending the message.');
            setIsSubmitted(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h1>Contact Form</h1>
            {isSubmitted ? (
                <div>
                    {submitStatus && (
                        <p className={`status-message ${submitStatus.includes('successfully') ? 'success' : 'error'}`}>
                            {submitStatus}
                        </p>
                    )}
                    <button onClick={() => setIsSubmitted(false)} className="back-button">
                        Back to Form
                    </button>
                </div>
            ) : (
                <form action="https://formsubmit.co/68fa287ee0160777efa548127d0bbd59" method="POST">
                    {/* FormSubmit configuration */}
                    <input type="hidden" name="_next" value={nextUrl} />
                    <input type="hidden" name="_subject" value="New Contact Form Submission" />
                    <input type="hidden" name="_captcha" value="true" />
                    <input type="hidden" name="_template" value="table" />

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="team">Select a Team:</label>
                        <select
                            id="team"
                            name="team"
                            value={formData.team}
                            onChange={handleChange}
                            required
                            className="team-select"
                        >
                            <option value="">-- Select Team --</option>
                            <option value="team1">Wädivolley H1</option>
                            <option value="team2">Wädivolley D1</option>
                        </select>
                    </div>
                    {formData.team && (
                        <div className="form-group">
                            <label>Select a Time Slot:</label>
                            <div className="time-slots">
                                {teamTimeSlots[formData.team].map((slot) => (
                                    <div key={slot.id} className="time-slot-option">
                                        <input
                                            type="radio"
                                            id={slot.id}
                                            name="timeSlot"
                                            value={slot.id}
                                            checked={formData.timeSlot === slot.id}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor={slot.id} className="time-slot-label">{slot.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
            {!isSubmitted && submitStatus && (
                <p className={`status-message ${submitStatus.includes('successfully') ? 'success' : submitStatus.includes('Error') || submitStatus.includes('error') ? 'error' : 'info'}`}>
                    {submitStatus}
                </p>
            )}

            <style jsx>{`
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    background-color: #fff;
                }
                @media (max-width: 650px) {
                    .container {
                        max-width: 100%;
                        margin: 0 10px;
                    }
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: bold;
                    color: #555;
                }
                input, textarea, select {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 16px;
                    transition: border-color 0.3s;
                }
                input:focus, textarea:focus, select:focus {
                    border-color: #4CAF50;
                    outline: none;
                    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
                }
                .team-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1em;
                    cursor: pointer;
                }
                textarea {
                    height: 150px;
                    resize: vertical;
                }
                .time-slots {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 10px;
                }
                .time-slot-option {
                    display: flex;
                    align-items: center;
                }
                .time-slot-option input[type="radio"] {
                    width: auto;
                    margin-right: 10px;
                }
                .time-slot-label {
                    display: inline;
                    margin: 0;
                    font-weight: normal;
                    cursor: pointer;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #45a049;
                }
                button:active {
                    transform: translateY(1px);
                }
                .status-message {
                    margin-top: 20px;
                    padding: 12px;
                    border-radius: 4px;
                    text-align: center;
                    font-weight: bold;
                }
                .success {
                    background-color: #dff0d8;
                    color: #3c763d;
                    border: 1px solid #d6e9c6;
                }
                .error {
                    background-color: #f2dede;
                    color: #a94442;
                    border: 1px solid #ebccd1;
                }
                .info {
                    background-color: #d9edf7;
                    color: #31708f;
                    border: 1px solid #bce8f1;
                }
                .back-button {
                    background-color: #5bc0de;
                    color: white;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                    margin-top: 20px;
                    transition: background-color 0.3s;
                }
                .back-button:hover {
                    background-color: #46b8da;
                }
                .back-button:active {
                    transform: translateY(1px);
                }
                :global(body) {
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 20px 0;
                }
            `}</style>
        </div>
    );
}
