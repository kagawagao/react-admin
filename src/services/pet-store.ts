import Service from '../utils/service';
const petStoreService = new Service({
  baseURL: process.env.APP_API_BASE + '/v2/',
  headers: {},
});
export default petStoreService;
