import { useState, useMemo } from 'react';
import './DataTable.css';

// Define the shape of a table column
export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

// Define sort configuration
export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

// Define the props for the DataTable component
export interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (config: SortConfig<T>) => void;
  onSelect?: (selectedItems: T[]) => void;
}

/**
 * Generic DataTable component with TypeScript
 * Supports sorting and row selection
 */
export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onSort,
  onSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Handle column header click for sorting
  const handleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);

    if (onSort) {
      onSort(newSortConfig);
    }
  };

  // Handle individual row selection
  const handleRowSelect = (id: string | number) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }

    setSelectedRows(newSelectedRows);

    if (onSelect) {
      const selectedItems = data.filter((item) => newSelectedRows.has(item.id));
      onSelect(selectedItems);
    }
  };

  // Handle "select all" checkbox
  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      // Deselect all
      setSelectedRows(new Set());
      if (onSelect) {
        onSelect([]);
      }
    } else {
      // Select all
      const allIds = new Set(data.map((item) => item.id));
      setSelectedRows(allIds);
      if (onSelect) {
        onSelect(data);
      }
    }
  };

  // Check if all rows are selected
  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

  // Get sort icon based on current sort state
  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '⇅';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th className="checkbox-column">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected;
                  }
                }}
                onChange={handleSelectAll}
                aria-label="Select all rows"
              />
            </th>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={column.sortable ? 'sortable' : ''}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                <div className="header-content">
                  <span>{column.title}</span>
                  {column.sortable && (
                    <span className="sort-icon">{getSortIcon(column.key)}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="empty-state">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className={selectedRows.has(row.id) ? 'selected' : ''}
              >
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    aria-label={`Select row ${row.id}`}
                  />
                </td>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
