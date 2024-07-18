import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const clientData = [
    { name: '11 May', value: 296000 },
    { name: '18 May', value: 308742 },
    { name: '25 May', value: 301895 },
    { name: '1 Jun', value: 325631 },
    { name: '8 Jun', value: 339877 },
    { name: '15 Jun', value: 352104 },
    { name: '22 Jun', value: 348290 },
    { name: '29 Jun', value: 367519 },
    { name: '6 Jul', value: 389765 },
    { name: '13 Jul', value: 381023 },
    { name: '18 Jul', value: 406102 }
];

const ClientCard = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    style={{
      backgroundColor: 'rgba(60, 221, 151, 0.05)',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}
    whileHover={{ y: -5, boxShadow: '0 6px 10px rgba(60, 221, 151, 0.2)' }}
  >
    <h3 style={{ color: '#8B9598', marginBottom: '10px', fontSize: '14px' }}>{title}</h3>
    <p style={{ color: '#3CDD97', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{value}</p>
  </motion.div>
);

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (username === 'admin' && password === 'XLab@@2030') {
        onLogin();
      } else {
        alert('Invalid credentials');
      }
    };
  
    const inputStyle = {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #3CDD97',
      borderRadius: '5px',
      backgroundColor: '#1E1E1E',
      color: '#FFFFFF',
      fontSize: '16px'
    };
  
    const buttonStyle = {
      width: '100%',
      padding: '12px',
      backgroundColor: '#3CDD97',
      color: '#111111',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s'
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2ABB7F'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3CDD97'}
        >
          Login
        </button>
      </form>
    );
  };

  

  
const ConnectedStatus = () => {
    const [scale, setScale] = useState(1);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setScale(prevScale => prevScale === 1 ? 1.5 : 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        backgroundColor: 'rgba(60, 221, 151, 0.1)',
        padding: '10px 20px',
        borderRadius: '20px',
      }}>
        <motion.div
          animate={{ scale }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#3CDD97',
            marginRight: '10px',
          }}
        />
        <span style={{ color: '#3CDD97', fontWeight: 'bold' }}>Connected</span>
        <span style={{ marginLeft: 'auto', color: '#8B9598' }}>7 Accounts Active</span>
      </div>
    );
  };
  
const ClientAccess = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const handleLogin = () => {
      setIsAuthenticated(true);
    };
  
    return (
      <div style={{
        backgroundColor: '#111111',
        minHeight: '100vh',
        color: '#FFFFFF',
        padding: '40px',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #3CDD97, #8B9598)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Client's Access Dashboard
        </motion.h1>
  
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <ConnectedStatus />
            <div style={{ 
              marginBottom: '40px', 
              backgroundColor: 'rgba(60, 221, 151, 0.05)', 
              borderRadius: '10px', 
              padding: '20px',
              boxShadow: '0 4px 20px rgba(60, 221, 151, 0.1)',
            }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientData}>
                  <XAxis dataKey="name" stroke="#8B9598" />
                  <YAxis stroke="#8B9598" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#3CDD97" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
            }}>
              <ClientCard title="Return" value="37.20%" />
              <ClientCard title="Balance" value="$406,102.094" />
              <ClientCard title="Profit Factor" value="2.3" />
              <ClientCard title="Drawdown" value="11.2%" />
              <ClientCard title="Accounts" value="7-SubAccounts" />
            </div>
          </>
        )}
      </div>
    );
  };
  
export default ClientAccess;