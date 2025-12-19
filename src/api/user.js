import request from "@/utils/request"

const v1Login = "v1/auth/login"
const v1Registration = "v1/auth/registration"
const v1SendCode2Email = "v1/auth/sendCode2Email"

const user = {
    login: (param) => { 
        return request.post(v1Login, param, {}) 
    },
    registration: (param) => {
        return request.post(v1Registration, param, {})
    },
    sendCode2Email: (param) => {
        return request.post(v1SendCode2Email, param, {})
    }
}


export default user;