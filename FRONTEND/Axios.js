import axios from 'axios'
import {baseURL} from './src/constants/Constants.Js'

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });

  export default instance