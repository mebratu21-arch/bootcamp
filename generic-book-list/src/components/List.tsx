import React from 'react';

// Generic Component Props
// T represents the type of items in the list
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Generic List Component
const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <div className="list-container">
      {items.length === 0 ? (
        <p style={{ color: '#aaa', fontStyle: 'italic' }}>No items to display.</p>
      ) : (
        items.map((item, index) => (
          <div key={index}>
            {renderItem(item)}
          </div>
        ))
      )}
    </div>
  );
};

export default List;
