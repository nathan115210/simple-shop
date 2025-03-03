export interface UserModel {
  id: number;
  name: string;
  email: string;
}

// Simulated database (Array as storage)
export let users: UserModel[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Function to add a user
export const addUser = (user: UserModel) => {
  users.push(user);
};
