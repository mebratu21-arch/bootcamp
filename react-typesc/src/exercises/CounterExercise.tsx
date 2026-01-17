import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const CounterExercise: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  const handleIncrement = () => {
    setCount(prev => {
      const newCount = prev + 1;
      setHistory([...history, newCount]);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount(prev => {
      const newCount = prev - 1;
      setHistory([...history, newCount]);
      return newCount;
    });
  };

  const handleReset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Card title="Interactive Counter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <h1 className="gradient-text" style={{ margin: 0 }}>{count}</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={handleDecrement} variant="secondary">-</Button>
            <Button onClick={handleReset} variant="secondary">Reset</Button>
            <Button onClick={handleIncrement}>+</Button>
          </div>
        </div>
      </Card>

      <Card title="History Log">
        {history.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No changes yet. Start clicking!</p>
        ) : (
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            flexWrap: 'wrap',
            marginTop: '1rem'
          }}>
            {history.map((val, idx) => (
              <span 
                key={idx} 
                style={{
                  background: 'var(--md-sys-color-surface-container-highest)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.9rem'
                }}
              >
                {val}
              </span>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
