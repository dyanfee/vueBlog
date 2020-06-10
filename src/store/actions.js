import { getAllCates, getAllTag } from "network/home"
import { login } from "network/admin"
import { ALL_CATEGORIES, ALL_TAGS, USER_SIGN, USER_SIGNOUT } from "./types"
import { alertMsg } from "common/utils"
const actions = {
    userLogin(context, payload) {
        return new Promise((resolve, reject) => {
            login(payload).then(res => {
                if (res.code == 200) {
                    context.commit(USER_SIGN, res.token)
                    resolve(res)
                } else {
                    alertMsg(res.message)
                    reject(res)
                }
            })
        })
    }
    , userLogout(context) {
        context.commit(USER_SIGNOUT);
    }
    ,
    getAllCategories(context, payload) {
        return new Promise((resolve, reject) => {
            getAllCates().then(res => {
                if (res.categories) {
                    context.commit(ALL_CATEGORIES, res.categories)
                    resolve(res.categories)
                }
            })
        })
    },
    getAllTags(context, payload) {
        return new Promise((resolve, reject) => {
            getAllTag().then(res => {
                if (res.tags) {
                    context.commit(ALL_TAGS, res.tags)
                    resolve(res.tags)
                }
            })
        })
    }
}



export default actions