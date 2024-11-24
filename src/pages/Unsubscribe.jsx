import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const email = searchParams.get('email'); // Extract email from query string

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch('https://nicosblog.com/pages/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('You have been unsubscribed successfully.');
      } else {
        const errorText = await response.text();
        setMessage(`Unsubscribe failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during unsubscribe:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (email) {
      handleUnsubscribe();
    } else {
      setMessage('Invalid unsubscribe link.');
    }
  }, [email]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Unsubscribe</h2>
        <p className="text-gray-600 text-center mb-6">{message}</p>
      </div>
    </div>
  );
}

export default Unsubscribe;