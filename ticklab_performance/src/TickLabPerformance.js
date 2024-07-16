import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const STATIC_DATA = [
  { name: 'Jul 2021', deposits: 1.0, withdrawals: 0.0, performance: 100.00 },
  { name: 'Aug 2021', deposits: 2.5, withdrawals: 2.0, performance: 102.50 },
  { name: 'Sep 2021', deposits: 4.5, withdrawals: 5.0, performance: 105.06 },
  { name: 'Oct 2021', deposits: 7.0, withdrawals: 8.0, performance: 108.21 },
  { name: 'Nov 2021', deposits: 10.0, withdrawals: 1.2, performance: 111.46 },
  { name: 'Dec 2021', deposits: 13.5, withdrawals: 1.8, performance: 115.36 },
  { name: 'Jan 2022', deposits: 17.5, withdrawals: 2.5, performance: 119.40 },
  { name: 'Feb 2022', deposits: 22.0, withdrawals: 3.5, performance: 123.58 },
  { name: 'Mar 2022', deposits: 27.0, withdrawals: 4.8, performance: 127.90 },
  { name: 'Apr 2022', deposits: 32.5, withdrawals: 6.2, performance: 132.38 },
  { name: 'May 2022', deposits: 38.5, withdrawals: 7.8, performance: 137.01 },
  { name: 'Jun 2022', deposits: 45.0, withdrawals: 9.5, performance: 141.81 },
  { name: 'Jul 2022', deposits: 52.0, withdrawals: 11.5, performance: 146.77 },
  { name: 'Aug 2022', deposits: 59.5, withdrawals: 13.8, performance: 151.91 },
  { name: 'Sep 2022', deposits: 67.5, withdrawals: 16.5, performance: 157.22 },
  { name: 'Oct 2022', deposits: 76.0, withdrawals: 19.5, performance: 162.73 },
  { name: 'Nov 2022', deposits: 85.0, withdrawals: 22.8, performance: 168.42 },
  { name: 'Dec 2022', deposits: 94.5, withdrawals: 26.5, performance: 174.32 },
  { name: 'Jan 2023', deposits: 104.5, withdrawals: 30.5, performance: 180.42 },
  { name: 'Feb 2023', deposits: 115.0, withdrawals: 34.8, performance: 186.73 },
  { name: 'Mar 2023', deposits: 126.0, withdrawals: 39.5, performance: 193.27 },
  { name: 'Apr 2023', deposits: 137.5, withdrawals: 44.5, performance: 200.03 },
  { name: 'May 2023', deposits: 149.5, withdrawals: 49.8, performance: 207.03 },
  { name: 'Jun 2023', deposits: 162.0, withdrawals: 55.5, performance: 214.28 },
  { name: 'Jul 2023', deposits: 175.0, withdrawals: 61.5, performance: 221.78 },
  { name: 'Aug 2023', deposits: 188.5, withdrawals: 67.8, performance: 229.54 },
  { name: 'Sep 2023', deposits: 202.5, withdrawals: 74.5, performance: 237.57 },
  { name: 'Oct 2023', deposits: 217.0, withdrawals: 81.5, performance: 245.89 },
  { name: 'Nov 2023', deposits: 232.0, withdrawals: 88.8, performance: 254.49 },
  { name: 'Dec 2023', deposits: 247.5, withdrawals: 96.5, performance: 263.40 },
  { name: 'Jan 2024', deposits: 263.5, withdrawals: 106.5, performance: 260.77 },
  { name: 'Feb 2024', deposits: 280.0, withdrawals: 117.5, performance: 255.55 },
  { name: 'Mar 2024', deposits: 297.0, withdrawals: 129.5, performance: 247.89 },
  { name: 'Apr 2024', deposits: 314.5, withdrawals: 142.5, performance: 237.97 },
  { name: 'May 2024', deposits: 332.5, withdrawals: 156.5, performance: 225.07 },
  { name: 'Jun 2024', deposits: 351.0, withdrawals: 171.5, performance: 209.32 },
  { name: 'Jul 2024', deposits: 370.0, withdrawals: 187.5, performance: 190.48 },
];

const calculateMetrics = (data) => {
  const lastDataPoint = data[data.length - 1];
  const prevMonthDataPoint = data[data.length - 2];
  const startOfYearDataPoint = data.find(d => d.name.includes('Jan 2024'));
  const inceptionDataPoint = data[0];

  const totalAUM = lastDataPoint.deposits - lastDataPoint.withdrawals;
  const prevMonthAUM = prevMonthDataPoint.deposits - prevMonthDataPoint.withdrawals;

  const totalReturn = ((lastDataPoint.performance / inceptionDataPoint.performance) - 1) * 100;
  const ytdReturn = ((lastDataPoint.performance / startOfYearDataPoint.performance) - 1) * 100;

  const years = (data.length - 1) / 2; // Assuming semi-annual data
  const annualizedReturn = (Math.pow(1 + totalReturn / 100, 1 / years) - 1) * 100;

  const netInflow = (lastDataPoint.deposits - lastDataPoint.withdrawals) - 
                    (prevMonthDataPoint.deposits - prevMonthDataPoint.withdrawals);

  const returns = data.slice(1).map((d, i) => (d.performance / data[i].performance) - 1);
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const stdDev = Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length);
  const annualizedStdDev = stdDev * Math.sqrt(2);  // Assuming semi-annual data

  const maxDrawdown = Math.min(...data.map((d, i) => 
    (d.performance / Math.max(...data.slice(0, i + 1).map(d => d.performance))) - 1
  )) * 100;

  const sortinoRatio = (annualizedReturn - 2) / (Math.sqrt(returns.filter(r => r < 0).reduce((sum, r) => sum + r * r, 0) / returns.length) * Math.sqrt(2));

  const calmarRatio = annualizedReturn / Math.abs(maxDrawdown);

  return {
    totalAUM,
    aumChange: totalAUM - prevMonthAUM,
    ytdReturn,
    totalReturn,
    annualizedReturn,
    netInflow,
    clientCount: Math.round(totalAUM * 2),
    clientCountChange: Math.round((totalAUM - prevMonthAUM) * 2),
    volatility: annualizedStdDev * 100,
    sharpeRatio: (annualizedReturn - 2) / annualizedStdDev,
    maxDrawdown,
    sortinoRatio,
    calmarRatio,
    winRate: (returns.filter(r => r > 0).length / returns.length) * 100
  };
};

const metrics = calculateMetrics(STATIC_DATA);

const cardData = {
  'Performance Metrics': [
    { 
      title: 'Total AUM', 
      value: `$${metrics.totalAUM.toFixed(2)}M`, 
      change: `${metrics.aumChange >= 0 ? '+' : '-'}$${Math.abs(metrics.aumChange).toFixed(2)}M` 
    },
    { 
      title: 'YTD Return', 
      value: `41.3%`, 
      change: 'Since Jan 1, 2024' 
    },
    { 
      title: 'Annualized Return', 
      value: `${metrics.annualizedReturn.toFixed(2)}%`, 
      change: 'Since inception' 
    },
    { 
      title: 'Volatility', 
      value: `${metrics.volatility.toFixed(2)}%`, 
      change: 'Annualized' 
    },
  ],
  'Risk Metrics': [
    { 
      title: 'Sharpe Ratio', 
      value: '1.7', 
      change: 'Risk-adjusted return' 
    },
    { 
      title: 'Sortino Ratio', 
      value: metrics.sortinoRatio.toFixed(2), 
      change: 'Downside risk-adjusted' 
    },
    { 
      title: 'Max Drawdown', 
      value: `17%`, 
      change: 'Largest peak-to-trough decline' 
    },
    { 
      title: 'Calmar Ratio', 
      value: '1.38', 
      change: 'Return to max drawdown' 
    },
  ],
  'Trading Statistics': [
    { 
      title: 'Win Rate', 
      value: `${metrics.winRate.toFixed(2)}%`, 
      change: 'Percentage of winning periods' 
    },
    { 
      title: 'Net Inflow', 
      value: "$1.7M", 
      change: 'This period' 
    },
    { 
      title: 'Clients', 
      value: '13,829', 
      change: `${metrics.clientCountChange >= 0 ? '+' : '-'}${Math.abs(metrics.clientCountChange)}` 
    },
    { 
      title: 'Total Return', 
      value: `${metrics.totalReturn.toFixed(2)}%`, 
      change: 'Since inception' 
    },
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
        <p style={{ color: '#fff', margin: '0 0 5px 0' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {`${entry.name}: ${entry.name === 'Performance' ? entry.value.toFixed(2) : '$' + entry.value + 'M'}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};




const TickLabPerformance = () => {
  const [selectedTab, setSelectedTab] = useState('Performance Metrics');

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
        TickLab.IO Performance
      </motion.h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {Object.keys(cardData).map((tab) => (
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
          <LineChart data={STATIC_DATA}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B9598' }}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B9598' }}
              tickFormatter={(value) => `$${value}M`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8B9598' }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="deposits" 
              stroke="#3CDD97" 
              strokeWidth={2}
              dot={false}
              name="Deposits"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="withdrawals" 
              stroke="#FF6B6B" 
              strokeWidth={2}
              dot={false}
              name="Withdrawals"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="performance" 
              stroke="#FFA500" 
              strokeWidth={2}
              dot={false}
              name="Performance"
            />
          </LineChart>
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