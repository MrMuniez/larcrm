import axios from 'axios';

export default axios.create({
  baseURL: `http://local.crm/api/`
});