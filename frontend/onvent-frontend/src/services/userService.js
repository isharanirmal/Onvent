import api from './api';

class UserService {
  // Create a new user
  createUser(user) {
    return api.post('/users/create', user);
  }

  // Get all users
  getAllUsers() {
    return api.get('/users/all');
  }

  // Get user by ID
  getUserById(id) {
    return api.get(`/users/${id}`);
  }

  // Update user by ID
  updateUser(id, user) {
    return api.put(`/users/update/${id}`, user);
  }

  // Delete user by ID
  deleteUser(id) {
    return api.delete(`/users/delete/${id}`);
  }
}

export default new UserService();