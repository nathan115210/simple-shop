/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
`;

const Illustration = styled.div`
    font-size: 4rem;
    color: #ffcc00;
    margin-bottom: 1rem;
`;

const Heading = styled.h2`
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
`;

const BackLink = styled(Link)`
    font-size: 1.2rem;
    color: #007bff;
    text-decoration: none;
    border: 1px solid #007bff;
    padding: 10px 20px;
    border-radius: 5px;
    transition: 0.3s;

    &:hover {
        background-color: #007bff;
        color: white;
    }
`;

// NotFoundPage Component
const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Illustration>
        <FaExclamationTriangle />
      </Illustration>
      <Heading>Not Found</Heading>
      <BackLink to="/">Go Back Home</BackLink>
    </Container>
  );
};

export default NotFoundPage;
