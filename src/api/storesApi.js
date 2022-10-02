import client from "./client";

const getAllStores = () =>
client.apiClient.get(
  `stores/getDummyStores`,
);


export default {
    getAllStores,
  };