export interface UserModel {
  userId: number;
  name: string;
  email: string;
}

// Simulated database (Array as storage)
export let users: UserModel[] = [
  { userId: 1, name: 'Alice', email: 'alice@example.com' },
  { userId: 2, name: 'Bob', email: 'bob@example.com' }
];

// Function to add a user
export const addUser = (user: UserModel) => {
  users.push(user);
};
