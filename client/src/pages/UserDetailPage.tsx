import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!user) return <h2>User not found</h2>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
};

export default UserDetailPage;
