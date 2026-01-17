import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface UserProfileProps {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  onStatusChange: (status: 'online' | 'offline' | 'busy') => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, role, avatar, status, onStatusChange }) => {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'online': return '#4caf50';
      case 'busy': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '1.5rem',
      background: 'var(--md-sys-color-surface-container)',
      borderRadius: '16px',
      border: '1px solid var(--md-sys-color-outline-variant)'
    }}>
      <div style={{ position: 'relative' }}>
        <img 
          src={avatar} 
          alt={name} 
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--md-sys-color-outline)'
          }} 
        />
        <div style={{
          position: 'absolute',
          bottom: '4px',
          right: '4px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: getStatusColor(status),
          border: '2px solid var(--md-sys-color-surface-container)'
        }} />
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>{name}</h3>
        <p style={{ margin: 0, color: 'var(--md-sys-color-on-surface-variant)' }}>{role}</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <Button 
            variant={status === 'online' ? 'primary' : 'secondary'} 
            onClick={() => onStatusChange('online')}
            style={{ fontSize: '0.8rem', height: '32px' }}
          >
            Online
          </Button>
          <Button 
            variant={status === 'busy' ? 'primary' : 'secondary'} 
            onClick={() => onStatusChange('busy')}
            style={{ fontSize: '0.8rem', height: '32px' }}
          >
            Busy
          </Button>
          <Button 
            variant={status === 'offline' ? 'primary' : 'secondary'} 
            onClick={() => onStatusChange('offline')}
            style={{ fontSize: '0.8rem', height: '32px' }}
          >
            Offline
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProfileExercise: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'busy'>('online');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Card title="Component Props & State">
        <p style={{ marginBottom: '2rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
          This exercise demonstrates passing props to child components and lifting state up. 
          The parent controls the status, while the child renders the UI.
        </p>
        
        <UserProfile 
          name="Alex Johnson" 
          role="Senior Frontend Developer" 
          avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          status={status}
          onStatusChange={setStatus}
        />
      </Card>

      <Card title="Debug Info">
        <div style={{ fontFamily: 'monospace', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          Current Status: <span style={{ color: 'var(--md-sys-color-primary)' }}>{status.toUpperCase()}</span>
        </div>
      </Card>
    </div>
  );
};
