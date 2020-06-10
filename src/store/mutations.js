import { ALL_CATEGORIES, ALL_TAGS, USER_SIGN, USER_SIGNOUT } from "./types"

const mutations = {
    addPostStat(state, payload) {
        state.statistics.post = payload.poststat || 0;
        state.statistics.cate = payload.catestat || 0;
        state.statistics.tags = payload.tagstat || 0;
    },
    [ALL_CATEGORIES](state, payload) {
        state.allCategories = payload
    },
    [ALL_TAGS](state, payload) {
        state.allTags = payload
    },
    [USER_SIGN](state, token) {
        localStorage.setItem('jwt', token);
        state.token = token;
    },
    [USER_SIGNOUT](state) {
        localStorage.removeItem('jwt');
        state.token = null;
    }

}

export default mutations;