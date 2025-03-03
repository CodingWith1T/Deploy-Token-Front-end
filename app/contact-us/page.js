import React from 'react';

const ContactUs = () => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      letterSpacing: '0.5px'
    }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#333', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>Get in Touch with Us</h1>
        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#555', fontWeight: '500', lineHeight: '1.8' }}>For any inquiries, please reach out to us:</p>
          <div style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '1.2rem', color: '#555', fontWeight: '500', lineHeight: '1.8' }}>Email: <a href="mailto:info@deploytokens.com" style={{ color: '#0073d5', textDecoration: 'none' }}>info@deploytokens.com</a></p>
          </div>
        </div>
        <p style={{ fontSize: '1.2rem', color: '#555', fontWeight: '500', lineHeight: '1.8', marginBottom: '2rem' }}>We look forward to hearing from you!</p>
        <div>
          <a href="mailto:support@deploytokens.com" style={{ display: 'inline-block', padding: '10px 20px', marginTop: '20px', backgroundColor: '#0073d5', color: 'white', textDecoration: 'none', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', cursor: 'pointer' }}>Email Us</a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;