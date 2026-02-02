import apiClient from './apiClient';

const newsService = {
  getAllNews: () => apiClient.get('newsArticles'),
  createNews: (news) => apiClient.post('newsArticles', news),
  updateNews: (news) => apiClient.put('newsArticles', news),
  deleteNews: (id) => apiClient.delete('newsArticles', id),
};

export default newsService;