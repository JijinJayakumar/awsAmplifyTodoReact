import axios from "axios";
import {restApiBaseUrl} from "./siteData";


const ApiInstance = axios.create({
  withCredentials: true,
    baseURL: restApiBaseUrl,
});

export default ApiInstance;