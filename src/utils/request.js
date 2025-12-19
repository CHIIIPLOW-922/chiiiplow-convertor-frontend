import axios from "axios";
import { createDiscreteApi } from "naive-ui";

const {message, loadingBar} = createDiscreteApi(["message", "loadingBar"])

const service = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

service.interceptors.request.use(
    (config) => {
        loadingBar.start();
        return config;
    },
    (error) => {
        loadingBar.error();
        message.error("request failed! server error");
        return Promise.reject("request failed! server error")
    }

)

service.interceptors.response.use(
    (response) => {
        loadingBar.finish();
        return response;
    },
    (error) => {
        console.log(error)
        loadingBar.error();
        message.error(error.response.data.detail);
        return Promise.reject("business error");
    }
)

class HttpClient {
    static post(url, params, config = {}) {
        return service.post(url, this._parseParams(params), this._getRequestConfig(config, url));
    }

    static postForm(url, params, config = { dataType: 'form' }) {
        return service.post(url, this._parseParams(params), this._getRequestConfig(config, url));
    }

    static get(url, config = {}) {
        return service.get(url, this._getRequestConfig(config, url));
    }

    static _parseParams(params) {
        let formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key] == undefined ? "" : params[key]);
        }
        return formData;
    }

    static _getRequestConfig(config, url) {
        const { dataType, responseType = 'json' } = config;
        let contentType = "application/json";
        if (dataType != null && dataType == 'form') {
            contentType = "application/x-www-form-urlencoded;charset=UTF-8";
        }
        let headers = {
            'Content-Type': contentType,
            // 'X-Requested-With': 'XMLHttpRequest',
        }


        return {
            responseType: responseType,
            headers: headers,
        };
    }
}

export default HttpClient;

