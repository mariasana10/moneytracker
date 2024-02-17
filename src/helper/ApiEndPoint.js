import { api_url } from "../../config";

const appApi = (path) => {

    return `${api_url}/${path}`;

};

// API call routes
export const endpoints = () => ({
    userAPI: appApi("user/v1"),
    salaryAPI: appApi("v1/salary"),
    reportAPI: appApi("v1/report"),
});