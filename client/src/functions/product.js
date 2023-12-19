import axios from "axios";

export const listData = async () => {
  return await axios.get(process.env.REACT_APP_API + '/product');
}

export const readData = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/product/' + id)
}

export const create = async (product) => {
  return await axios.post(process.env.REACT_APP_API + '/product', product);
}

export const update = async (id, product) => {
  return await axios.put(process.env.REACT_APP_API + '/product/' + id, product);
}

export const remove = async (id) => {
  return await axios.delete(process.env.REACT_APP_API + '/product/' + id);
}