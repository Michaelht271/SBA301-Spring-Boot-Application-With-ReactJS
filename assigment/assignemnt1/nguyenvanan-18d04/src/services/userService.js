import apiClient from './apiClient';

const userService = {
  getAllUsers: () => apiClient.get('systemAccounts'),
  createUser: (user) => apiClient.post('systemAccounts', user),
  updateUser: (user) => apiClient.put('systemAccounts', user),
  deleteUser: (id) => apiClient.delete('systemAccounts', id),
};

export default userService;