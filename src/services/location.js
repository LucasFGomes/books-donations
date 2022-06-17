import axios from 'axios';

const location = axios.create({
  baseURL:  "https://servicodados.ibge.gov.br/api/v1/localidades"
});

export default location;