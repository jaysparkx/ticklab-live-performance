import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Card = ({ title, description, index, onClick, isBlurred }) => (
  <motion.div
    style={{
      backgroundColor: '#111111',
      borderRadius: '15px',
      padding: '30px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.1)',
      cursor: isBlurred ? 'not-allowed' : 'pointer',
      filter: isBlurred ? 'blur(5px)' : 'none',
      opacity: isBlurred ? 0.7 : 1,
      pointerEvents: isBlurred ? 'none' : 'auto',
      backgroundImage: 'linear-gradient(145deg, rgba(60, 221, 151, 0.1) 0%, rgba(17, 17, 17, 0) 100%)',
    }}
    onClick={onClick}
    whileHover={isBlurred ? {} : { y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.15)' }}
    transition={{ duration: 0.3 }}
  >
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '5px',
      background: 'linear-gradient(90deg, #3CDD97, #8B9598)',
    }} />
    <h2 style={{ 
      fontSize: '1.6rem', 
      color: '#3CDD97', 
      marginBottom: '15px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      {title}
    </h2>
    <p style={{ 
      color: '#8B9598', 
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '20px',
    }}>
      {description}
    </p>
    <div style={{
      position: 'absolute',
      bottom: '-20px',
      right: '-20px',
      fontSize: '8rem',
      color: 'rgba(60, 221, 151, 0.03)',
      fontWeight: '800',
      zIndex: '0',
    }}>
      {index + 1}
    </div>
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      padding: '8px 15px',
      backgroundColor: 'rgba(60, 221, 151, 0.1)',
      borderRadius: '20px',
      fontSize: '0.8rem',
      color: '#3CDD97',
      fontWeight: '600',
      zIndex: '1',
    }}>
      {isBlurred ? 'Locked' : 'Explore'}
    </div>
  </motion.div>
);

const CardPage = () => {
  const navigate = useNavigate();

  const cardData = [
    { 
      title: 'Elite Performance', 
      description: 'Elevate your productivity with our cutting-edge solutions designed for the discerning professional.',
      onClick: () => navigate('/ticklab-performance')
    },
    { 
      title: 'E.D.I.T.H', 
      description: "'Even Dead, I'm The Hero: Our AI-powered trading assistant that seamlessly integrates with your strategies.'"
    },
    { 
      title: 'AI Agent (Coming Soon)', 
      description: "'Harness unparalleled control with our AI Agent, designed to propel TickLab.IO's performance to new heights.'"
    },
    { 
      title: 'Workers (Coming Soon)', 
      description: 'Become a Quant-Engineer: Build algorithms that attract funding and showcase your trading prowess.'
    },
    { 
      title: 'Evaluation (Coming Soon)', 
      description: 'Track your progress, prove your skills, and transition to managing real funds with our comprehensive evaluation system.'
    },
    { 
      title: 'API Integration (Coming Soon)', 
      description: 'Enhance your trading ecosystem with our robust API solutions, enabling seamless connectivity and automation.'
    },
  ];
  return (
    <div style={{ 
      padding: '60px 40px', 
      backgroundColor: '#111111', 
      minHeight: '100vh',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      backgroundImage: 'radial-gradient(circle at top right, rgba(60, 221, 151, 0.1) 0%, rgba(17, 17, 17, 0) 60%)',
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '60px', 
        color: '#3CDD97',
        fontSize: '3rem',
        fontWeight: '800',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(60, 221, 151, 0.3)',
      }}>
        TickLab.IO
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {cardData.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            index={index} 
            onClick={card.onClick}
            isBlurred={card.title !== 'Elite Performance'}
          />
        ))}
      </div>
    </div>
  );
};

export default CardPage;