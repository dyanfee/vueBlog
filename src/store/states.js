export default {
    statistics: {
        post: 0,
        cate: 0,
        tags: 0
    },
    categories: [],
    tags: [],
    token: isLoggedIn() || null
}

function isLoggedIn() {
    let token = localStorage.getItem('jwt');
    if (token) {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        if (payload.exp > Date.now() / 1000) {
            return token;
        }
    } else {
        return false;
    }

}