import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/users">View Users</Link>
      </nav>
    </div>
  );
};

export default HomePage;
