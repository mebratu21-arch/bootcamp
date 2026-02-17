import { useState } from 'react';
import { DataTable, TableColumn, SortConfig } from './DataTable';
import './UserTable.css';

// Define the User interface
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

// Sample user data
const sampleUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@company.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@company.com', role: 'Designer', status: 'inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@company.com', role: 'Manager', status: 'active' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@company.com', role: 'Developer', status: 'pending' },
  { id: 6, name: 'Fiona Green', email: 'fiona.g@company.com', role: 'Designer', status: 'active' },
  { id: 7, name: 'George Wilson', email: 'george.w@company.com', role: 'Developer', status: 'active' },
  { id: 8, name: 'Hannah Lee', email: 'hannah.l@company.com', role: 'Admin', status: 'inactive' },
];

export function UserTable() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Define columns for the user table
  const columns: TableColumn<User>[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const status = value as User['status'];
        const statusClass = `status-badge status-${status}`;
        return <span className={statusClass}>{status}</span>;
      },
    },
  ];

  // Handle sorting
  const handleSort = (config: SortConfig<User>) => {
    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[config.key];
      const bValue = b[config.key];

      if (aValue < bValue) {
        return config.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  // Handle selection
  const handleSelect = (selected: User[]) => {
    setSelectedUsers(selected);
  };

  return (
    <div className="user-table-container">
      <div className="user-table-header">
        <h2>User Management</h2>
        <p className="user-table-subtitle">
          Manage your team members and their roles
        </p>
      </div>

      {selectedUsers.length > 0 && (
        <div className="selection-info">
          <span className="selection-count">
            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
          </span>
          <div className="selection-actions">
            <button className="action-btn action-btn-primary">
              Activate
            </button>
            <button className="action-btn action-btn-secondary">
              Deactivate
            </button>
            <button className="action-btn action-btn-danger">
              Delete
            </button>
          </div>
        </div>
      )}

      <DataTable
        data={users}
        columns={columns}
        onSort={handleSort}
        onSelect={handleSelect}
      />

      <div className="user-table-footer">
        <p className="footer-stats">
          Total Users: <strong>{users.length}</strong> | 
          Active: <strong>{users.filter(u => u.status === 'active').length}</strong> | 
          Inactive: <strong>{users.filter(u => u.status === 'inactive').length}</strong> | 
          Pending: <strong>{users.filter(u => u.status === 'pending').length}</strong>
        </p>
      </div>
    </div>
  );
}
