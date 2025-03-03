import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { UserModel } from '../../../server/src/models/user.model.ts';

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { name, email };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
          <li key={user.userId}>
            <Link to={`/users/${user.userId}`}>{user.name}</Link>
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
