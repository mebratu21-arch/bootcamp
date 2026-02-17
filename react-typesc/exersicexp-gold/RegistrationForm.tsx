import { useState } from 'react';
import { useForm, ValidationRules } from './useForm';
import './RegistrationForm.css';

export function RegistrationForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Define validation rules for the registration form
  const validationRules: ValidationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
      custom: (value) => {
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
        }
        return undefined;
      },
    },
    confirmPassword: {
      required: true,
      custom: (value, allValues) => {
        if (value !== allValues.password) {
          return 'Passwords do not match';
        }
        return undefined;
      },
    },
  };

  // Handle form submission
  const handleRegistration = async (values: { [key: string]: string }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Registration successful:', values);
      setSubmitStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmitStatus('error');
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationRules,
    onSubmit: handleRegistration,
  });

  return (
    <div className="registration-form-container">
      <div className="registration-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us today and get started</p>

        {submitStatus === 'success' && (
          <div className="alert alert-success">
            ✓ Registration successful! Welcome aboard.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-error">
            ✗ Registration failed. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="John Doe"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="john@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••••"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <small className="help-text">
              Minimum 6 characters, include uppercase and number
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="form-footer">
          Already have an account? <a href="#login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
