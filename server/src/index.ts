import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle unexpected errors to prevent port locking
process.on('SIGTERM', () => {
  console.log('Server shutting down...');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Process interrupted.');
  server.close(() => process.exit(0));
});
