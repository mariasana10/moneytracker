import axios from "axios";

import { api_url } from "../../config";


const axiosClient = axios.create({
  baseURL: api_url,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    common: {
      //set token for authorization
      Authorization: "",
    },
  },
});


class apiClient {

  static async post(url, body, callback) {
    try {

      axiosClient.post(url, body).then(async (response) => {

        return callback(null, response);

      }).catch((error) => {
        return callback(error, null)
      })
    } catch (err) {
      console.log(err);
      return callback(err, null)
    }
  }

  static async get(url, callback) {
    try {

      axiosClient.get(url).then(async (response) => {

        return callback(null, response);

      }).catch((error) => {
        return callback(error, null)
      })
    } catch (err) {
      console.log(err);
      return callback(err, null)
    }
  }

  static async put(url, body, callback) {
    try {


      axiosClient.put(url, body).then(async (response) => {

        return callback(null, response);

      }).catch((error) => {
        return callback(error, null)
      })
    } catch (err) {
      console.log(err);
      return callback(err, null)
    }
  }

  static async delete(url, callback) {
    try {


      axiosClient.delete(url).then(async (response) => {

        return callback(null, response);

      }).catch((error) => {
        return callback(error, null)
      })
    } catch (err) {
      console.log(err);
      return callback(err, null)
    }
  }

  static async fetch(url, bodyData, callback) {
    try {

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: sessionToken,
        },
        body: bodyData,
      })
        .then((res) => {
          return callback(null, res);
        })
        .catch(error => {
            return callback(error, null);
        });
    } catch (err) {
      console.log(err);
      return callback(err, null)
    }
  }
}

export default apiClient;



