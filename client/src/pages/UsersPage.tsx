import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  console.log('users', users);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { name, email };

    const response = await fetch('http://localhost:5001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setName('');
      setEmail('');
    } else {
      console.error('Error adding user');
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default UsersPage;
