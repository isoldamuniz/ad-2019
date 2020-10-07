import http from './http-common';

const pessoas = async () => {
  return http.get(`/`);
}

const register = (data) => {
  return http.post('/', data);
};

const update = (id, data) => {
  return http.put(`/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/${id}`);
};

export default {
  pessoas,
  register,
  update,
  remove
};
