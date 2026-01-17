interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard = ({ name = 'Guest', age, role }: UserCardProps) => {
  return (
    <div className="card user-card">
      <h2>Exercise 4: User Card</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Age:</strong> {age !== undefined ? age : 'N/A'}</p>
        <p><strong>Role:</strong> {role || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserCard;
