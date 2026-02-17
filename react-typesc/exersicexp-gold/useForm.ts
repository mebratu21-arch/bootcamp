import { useState, ChangeEvent, FormEvent } from 'react';

// Define the shape of form values
export interface FormValues {
  [key: string]: string;
}

// Define the shape of form errors
export interface FormErrors {
  [key: string]: string;
}

// Define validation rules for each field
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string, allValues: FormValues) => string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

// Define the return type of the hook
export interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  isValid: boolean;
}

interface UseFormParams {
  initialValues: FormValues;
  validationRules: ValidationRules;
  onSubmit: (values: FormValues) => void | Promise<void>;
}

/**
 * Custom hook for form management with TypeScript
 * Handles form state, validation, and submission
 */
export function useForm({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormParams): UseFormReturn {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Validate a single field
  const validateField = (name: string, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required validation
    if (rules.required && !value.trim()) {
      return 'This field is required';
    }

    // Skip other validations if field is empty and not required
    if (!value.trim()) return '';

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    // Pattern validation (e.g., email)
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value, values);
      if (customError) return customError;
    }

    return '';
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update values
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on change if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(validationRules).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Check if form is valid
  const isValid = Object.keys(errors).every((key) => !errors[key]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    isValid,
  };
}
