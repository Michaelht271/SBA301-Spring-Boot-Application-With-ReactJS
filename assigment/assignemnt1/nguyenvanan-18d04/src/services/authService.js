import apiClient from './apiClient';

const authService = {
  login: async (username, password) => {
    // In a real app, this would be a POST to /login.
    // For json-server, we fetch all users and check for a match.
    const users = await apiClient.get('systemAccounts');
    const user = users.find(
      (u) => u.accountName === username && u.accountPassword === password
    );

    if (user) {
      // In a real app, you'd get a token back. Here, we just return the user object.
      // We'll remove the password for security before returning.
      const { accountPassword, ...userToReturn } = user;
      return userToReturn;
    } else {
      throw new Error('Invalid username or password');
    }
  },
};

export default authService;