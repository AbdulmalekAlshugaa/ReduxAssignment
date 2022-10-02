import client from "./client";

const getAllStores = () =>
client.apiClient.get(
  `stores/getAllStores`,
);


export default {
    getAllStores,
  };