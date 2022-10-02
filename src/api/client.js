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


apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjFlMzc0ZGZmMTViNTAxZmI3NzQ0NmUiLCJpc1ZlcmlmaWVkIjp0cnVlLCJyb2xlIjoiVVNFUiIsImZzbVRva2VuIjoiIiwibmFtZSI6Iti02YfYp9ioINi02LnZhNin2YYiLCJpbWFnZUNvdmVyIjpudWxsLCJkb2IiOiIyMDAxLTAxLTAxVDExOjAwOjAwLjAwMFoiLCJwaG9uZU51bWJlciI6IjczNjcxMDU2OCIsImlhdCI6MTY2NDcxMzM0OX0.yNlvs1dzy7bXMgf2Tj6ro0NzWpsvj4bPozCutKQeOdQ"
    if (!authToken) return;
    request.headers["x-auth-token"] = authToken;
  });





//   const data = await cache.get(url);
//   return data ? { ok: true, data } : response;
// };

export default {
  apiClient,

};
