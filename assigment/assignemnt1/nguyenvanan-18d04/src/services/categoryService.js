import apiClient from './apiClient';

const categoryService = {
  getAllCategories: () => apiClient.get('categories'),
  createCategory: (category) => apiClient.post('categories', category),
  updateCategory: (category) => apiClient.put('categories', category),
  deleteCategory: (id) => apiClient.delete('categories', id),
};

export default categoryService;