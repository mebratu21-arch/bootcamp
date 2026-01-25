import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';
import { selectAllCategories } from '../store/selectors/categorySelectors';
import '../styles/TaskForm.css';

function TaskForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: categories[0]?.id || '',
    progress: 0,
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value, 10) : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      
      if (!formData.title.trim()) {
        alert('Please enter a task title');
        return;
      }

      if (!formData.categoryId) {
        alert('Please select a category');
        return;
      }

      dispatch(addTask(formData));
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        categoryId: categories[0]?.id || '',
        progress: 0,
      });
    },
    [dispatch, formData, categories]
  );

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter task description..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Category *</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="progress">
            Initial Progress: {formData.progress}%
          </label>
          <input
            type="range"
            id="progress"
            name="progress"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleInputChange}
            className="progress-slider"
          />
        </div>

        <button type="submit" className="btn-submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
