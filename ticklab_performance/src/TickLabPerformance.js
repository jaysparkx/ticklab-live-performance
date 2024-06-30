import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = {
  'Total Assets': [
    { name: 'Q1', value: 4000 },
    { name: 'Q1', value: 3000 },
    { name: 'Q1', value: 2000 },
    { name: 'Q2', value: 2780 },
    { name: 'Q2', value: 1890 },
    { name: 'Q2', value: 2790 },
    { name: 'Q3', value: 3090 },
    { name: 'Q3', value: 3390 },
    { name: 'Q3', value: 4090 },
    { name: 'Q4', value: 4390 },
    { name: 'Q4', value: 4790 },
    { name: 'Q4', value: 4590 },
    { name: 'Q1', value: 5190 },
  ],
  'Forex': [
    { name: 'Jan', value: 3000 },
    { name: 'Feb', value: 3500 },
    { name: 'Mar', value: 4000 },
    { name: 'Apr', value: 3780 },
    { name: 'May', value: 4200 },
    { name: 'Jun', value: 4500 },
  ],
  'Crypto': [
    { name: 'Jan', value: 2000 },
    { name: 'Feb', value: 2800 },
    { name: 'Mar', value: 3200 },
    { name: 'Apr', value: 2900 },
    { name: 'May', value: 3500 },
    { name: 'Jun', value: 3800 },
  ],
  'Stocks': [
    { name: 'Jan', value: 5000 },
    { name: 'Feb', value: 4800 },
    { name: 'Mar', value: 5200 },
    { name: 'Apr', value: 5500 },
    { name: 'May', value: 5300 },
    { name: 'Jun', value: 5600 },
  ],
};

const cardData = {
  'Total Assets': [
    { title: 'Total AUM', value: '$101.5M', change: '+5.2%' },
    { title: 'YTD Return', value: '55.8%', change: '+2.3%' },
    { title: 'Sharpe Ratio', value: '1.8', change: '+0.2' },
    { title: 'Clients', value: '234', change: '+56' },
  ],
  'Forex': [
    { title: 'Forex AUM', value: '$3.2B', change: '+3.8%' },
    { title: 'Pip Profit', value: '1,250', change: '+180' },
    { title: 'Win Rate', value: '68%', change: '+2%' },
    { title: 'Drawdown', value: '4.5%', change: '-0.5%' },
  ],
  'Crypto': [
    { title: 'Crypto AUM', value: '$1.8B', change: '+15.2%' },
    { title: 'BTC Dominance', value: '45%', change: '-2%' },
    { title: 'Volatility', value: '3.2%', change: '+0.5%' },
    { title: 'Yield Farming', value: '8.5%', change: '+1.2%' },
  ],
  'Stocks': [
    { title: 'Stocks AUM', value: '$5.5B', change: '+2.7%' },
    { title: 'Dividend Yield', value: '3.2%', change: '+0.1%' },
    { title: 'P/E Ratio', value: '22.5', change: '-1.2' },
    { title: 'Beta', value: '0.95', change: '-0.03' },
  ],
};

const Tab = ({ title, selected, onClick }) => (
  <motion.div
    onClick={onClick}
    style={{
      padding: '10px 20px',
      cursor: 'pointer',
      position: 'relative',
      color: selected ? '#3CDD97' : '#8B9598',
      fontWeight: selected ? 'bold' : 'normal',
    }}
    whileHover={{ color: '#3CDD97' }}
  >
    {title}
    {selected && (
      <motion.div
        layoutId="underline"
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          right: 0,
          height: '2px',
          background: '#3CDD97',
        }}
      />
    )}
  </motion.div>
);

const Card = ({ title, value, change }) => (
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
    <p style={{ color: change.startsWith('+') ? '#3CDD97' : '#FF6B6B', fontSize: '14px', marginTop: '5px' }}>{change}</p>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        border: '1px solid #3CDD97',
        padding: '10px',
        borderRadius: '5px',
      }}>
        <p style={{ color: '#fff' }}>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const TickLabPerformance = () => {
  const [selectedTab, setSelectedTab] = useState('Total Assets');

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
        TickLab.IO Performance Dashboard
      </motion.h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {Object.keys(performanceData).map((tab) => (
          <Tab
            key={tab}
            title={tab}
            selected={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
          />
        ))}
      </div>

      <div style={{ 
        marginBottom: '40px', 
        backgroundColor: 'rgba(60, 221, 151, 0.05)', 
        borderRadius: '10px', 
        padding: '20px',
        boxShadow: '0 4px 20px rgba(60, 221, 151, 0.1)',
      }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData[selectedTab]}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3CDD97" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3CDD97" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B9598' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B9598' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3CDD97" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
          }}
        >
          {cardData[selectedTab].map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TickLabPerformance;