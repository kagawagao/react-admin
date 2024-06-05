import Service from '../utils/service';
const petStoreService = new Service({
  baseURL: '/v2/',
  headers: {},
});
export default petStoreService;
