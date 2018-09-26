import Cookies from 'js-cookie';

const TOKEN_KEY = "TOKEN"
const UID_KEY = "UID_KEY"

let token

let uId

const UserManager = {
    init: function () {
        if (!token) {
            const value = Cookies.get(TOKEN_KEY)
            if (value !== null) {
                token = value;
            }
        }

        if (!uId) {
            const value = Cookies.get(UID_KEY)
            if (value !== null) {
                uId = value;
            }
        }
    },

    set: function (user) {
        token = user.token
        uId = user.uId
        Cookies.set(TOKEN_KEY, token)
        Cookies.set(UID_KEY, uId)
    },

    get: function () {
        if (!token || !uId) {

        }
        return {
            token,
            uId
        }
    }
}

export default UserManager