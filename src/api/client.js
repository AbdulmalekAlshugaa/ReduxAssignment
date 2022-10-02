import { create } from "apisauce";
import settings from '../config/setting';


const headers = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'X-Country-Code': 'YE',
  'X-Platform': Platform.OS,
}
const apiClient = create({
  baseURL: settings.apiUrl,
  headers: headers,
  timeout: 60000,
});






// remove unnecessary code 

//   const data = await cache.get(url);
//   return data ? { ok: true, data } : response;
// };

export default {
  apiClient,

};
