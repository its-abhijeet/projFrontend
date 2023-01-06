import { API } from "../../backend";
export const getProducts = () => {
  return fetch(`${API}/products`, { mehtod: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
