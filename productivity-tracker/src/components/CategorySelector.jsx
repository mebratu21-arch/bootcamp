import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllCategories,
  selectSelectedCategoryId,
  selectTaskCountByCategory,
} from '../store/selectors/categorySelectors';
import { setSelectedCategory } from '../store/slices/categoriesSlice';
import '../styles/CategorySelector.css';

function CategorySelector() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const selectedCategoryId = useSelector(selectSelectedCategoryId);
  const taskCounts = useSelector(selectTaskCountByCategory);

  const handleSelectCategory = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div className="category-selector">
      <h3>Categories</h3>
      <div className="category-list">
        {/* "All Categories" option */}
        <button
          className={`category-item ${
            selectedCategoryId === null ? 'active' : ''
          }`}
          onClick={() => handleSelectCategory(null)}
        >
          <span className="category-dot" style={{ backgroundColor: '#6b7280' }} />
          <span className="category-name">All Categories</span>
          <span className="category-badge">
            {Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
          </span>
        </button>

        {/* Category options */}
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${
              selectedCategoryId === category.id ? 'active' : ''
            }`}
            onClick={() => handleSelectCategory(category.id)}
          >
            <span
              className="category-dot"
              style={{ backgroundColor: category.color }}
            />
            <span className="category-name">{category.name}</span>
            <span className="category-badge">
              {taskCounts[category.id] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
