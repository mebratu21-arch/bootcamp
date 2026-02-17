import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoExercise: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Master TypeScript Generics', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Card title="Task Manager" className="todo-card">
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add new task..."
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--md-sys-color-outline)',
              background: 'var(--md-sys-color-surface-container)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '1rem'
            }}
          />
          <Button type="submit">Add</Button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {todos.map(todo => (
            <li 
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'var(--md-sys-color-surface-container-low)',
                borderRadius: '8px',
                borderLeft: `4px solid ${todo.completed ? 'var(--md-sys-color-primary)' : 'transparent'}`
              }}
            >
              <div 
                onClick={() => toggleTodo(todo.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${todo.completed ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: todo.completed ? 'var(--md-sys-color-primary)' : 'transparent'
                }}>
                  {todo.completed && <span style={{ color: 'var(--md-sys-color-on-primary)', fontSize: '14px' }}>✓</span>}
                </div>
                <span style={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.6 : 1,
                  fontSize: '1.1rem'
                }}>
                  {todo.text}
                </span>
              </div>
              <Button 
                variant="text" 
                onClick={() => deleteTodo(todo.id)}
                style={{ padding: '4px 8px', minHeight: '32px' }}
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>
        
        {todos.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>
            All tasks completed! 🎉
          </p>
        )}
      </Card>
    </div>
  );
};
