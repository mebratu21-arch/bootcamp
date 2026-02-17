import React from 'react';
import type { Exercise } from '../exercises/types';

interface LayoutProps {
  exercises: Exercise[];
  activeId: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ exercises, activeId, onSelect, children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>React<span>Lab</span></h2>
          <p>TypeScript Exercises</p>
        </div>
        <nav className="nav-list">
          {exercises.map(ex => (
            <button
              key={ex.id}
              className={`nav-item ${activeId === ex.id ? 'active' : ''}`}
              onClick={() => onSelect(ex.id)}
            >
              {ex.title}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>© 2024 React Exercises</p>
        </div>
      </aside>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
