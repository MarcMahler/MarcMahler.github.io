import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

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
            { id: 'friday-20-22', label: 'Friday, 20:00 - 22:00' }
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

        // Log initialization
        console.log('Form initialized');
    }, []);

    // Debug: Log form data changes
    useEffect(() => {
        console.log('Form data updated:', formData);
        if (formData.team) {
            console.log('Selected team time slots:', teamTimeSlots[formData.team]);
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If changing team, reset timeSlot
        if (name === 'team') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                timeSlot: ''
            }));
            console.log('Team selected:', value); // Debug log
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <>
            <Head>
                <title>Wädivolley - Training Registration</title>
                <meta name="description" content="Register for Wädivolley training sessions" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            <div className="page-container">
                <header className="header">
                    <div className="logo-container">
                        <Image 
                            src="/image105.png" 
                            alt="Wädivolley Logo" 
                            width={120} 
                            height={120}
                            priority
                        />
                    </div>
                    <h1>Wädivolley Training Registration</h1>
                </header>
                
                <main className="main-content">
                    <div className="container">
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
                                <input type="hidden" name="_subject" value="New Training Registration" />
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
                                {formData.team ? (
                                    <div className="form-group">
                                        <label>Select a Time Slot:</label>
                                        <div className="time-slots">
                                            {teamTimeSlots[formData.team] && teamTimeSlots[formData.team].map((slot) => (
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
                                ) : null}
                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="submit-button">Register</button>
                            </form>
                        )}
                        {!isSubmitted && submitStatus && (
                            <p className={`status-message ${submitStatus.includes('successfully') ? 'success' : submitStatus.includes('Error') || submitStatus.includes('error') ? 'error' : 'info'}`}>
                                {submitStatus}
                            </p>
                        )}
                    </div>
                </main>
                
                <footer className="footer">
                    <p>© {new Date().getFullYear()} Wädivolley. All rights reserved.</p>
                </footer>
            </div>

            <style jsx>{`
                :global(body) {
                    margin: 0;
                    padding: 0;
                    font-family: 'Montserrat', sans-serif;
                    background-color: #f5f5f5;
                    color: #333;
                }
                
                .page-container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                
                .header {
                    background-color: #1a3a8b;
                    color: white;
                    padding: 1rem 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .logo-container {
                    margin-bottom: 1rem;
                }
                
                .header h1 {
                    margin: 0;
                    font-size: 2rem;
                    text-align: center;
                    padding: 0 1rem;
                }
                
                .main-content {
                    flex: 1;
                    padding: 2rem 1rem;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 2rem;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                
                .form-group {
                    margin-bottom: 1.5rem;
                }
                
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #444;
                }
                
                input, textarea, select {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 1rem;
                    font-family: 'Montserrat', sans-serif;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }
                
                input:focus, textarea:focus, select:focus {
                    border-color: #1a3a8b;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(26, 58, 139, 0.2);
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
                    height: 120px;
                    resize: vertical;
                }
                
                .time-slots {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-top: 0.5rem;
                    background-color: #f9f9f9;
                    padding: 1rem;
                    border-radius: 4px;
                }
                
                .time-slot-option {
                    display: flex;
                    align-items: center;
                }
                
                .time-slot-option input[type="radio"] {
                    width: auto;
                    margin-right: 0.75rem;
                    cursor: pointer;
                }
                
                .time-slot-label {
                    display: inline;
                    margin: 0;
                    font-weight: normal;
                    cursor: pointer;
                }
                
                .submit-button, .back-button {
                    width: 100%;
                    padding: 0.75rem;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.1s;
                    font-family: 'Montserrat', sans-serif;
                }
                
                .submit-button {
                    background-color: #1a3a8b;
                    color: white;
                }
                
                .submit-button:hover {
                    background-color: #15307a;
                }
                
                .back-button {
                    background-color: #5bc0de;
                    color: white;
                    margin-top: 1rem;
                }
                
                .back-button:hover {
                    background-color: #46b8da;
                }
                
                .submit-button:active, .back-button:active {
                    transform: translateY(1px);
                }
                
                .status-message {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    border-radius: 4px;
                    text-align: center;
                    font-weight: 600;
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
                
                .footer {
                    background-color: #1a3a8b;
                    color: white;
                    text-align: center;
                    padding: 1rem;
                    margin-top: 2rem;
                }
                
                .footer p {
                    margin: 0;
                    font-size: 0.9rem;
                }
                
                @media (max-width: 650px) {
                    .container {
                        padding: 1.5rem;
                    }
                    
                    .header h1 {
                        font-size: 1.5rem;
                    }
                }
                
                @media (min-width: 768px) {
                    .header {
                        flex-direction: row;
                        justify-content: center;
                        padding: 1rem 2rem;
                    }
                    
                    .logo-container {
                        margin-bottom: 0;
                        margin-right: 1.5rem;
                    }
                }
            `}</style>
        </>
    );
}