/**
 * Validate task creation data
 * @param {Object} data - Request body data
 * @returns {Object} { isValid: boolean, errors: Array }
 */
function validateTaskCreation(data) {
  const errors = [];

  // Check for required fields
  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
    errors.push('Description is required and must be a non-empty string');
  }

  // Optional: validate status if provided
  if (data.status) {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(data.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate task update data
 * @param {Object} data - Request body data
 * @returns {Object} { isValid: boolean, errors: Array }
 */
function validateTaskUpdate(data) {
  const errors = [];
  const validFields = ['title', 'description', 'status'];
  const providedFields = Object.keys(data);

  // Check if at least one valid field is provided
  const hasValidField = providedFields.some(field => validFields.includes(field));
  
  if (!hasValidField) {
    errors.push('At least one field (title, description, status) must be provided for update');
  }

  // Validate field types if provided
  if (data.title !== undefined && (typeof data.title !== 'string' || !data.title.trim())) {
    errors.push('Title must be a non-empty string');
  }

  if (data.description !== undefined && (typeof data.description !== 'string' || !data.description.trim())) {
    errors.push('Description must be a non-empty string');
  }

  if (data.status !== undefined) {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(data.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateTaskCreation,
  validateTaskUpdate
};
