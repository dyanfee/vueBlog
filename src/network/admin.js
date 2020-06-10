import { request } from './request'
export function getPostsByPage(page) {
    return request({
        url: `/posts/${page}`,
    })
}

// 删除文章
export function removePost(data) {
    return request({
        method: "post",
        url: "/post/remove",
        data,
    })
}

// 用户登录
export function login(data) {
    return request({
        method: "post",
        url: "/login",
        data,
    })
}

// 编辑文章
export function postEdit(data) {
    return request({
        method: "post",
        url: "/post/edit",
        data
    })
}

// 新建文章
export function postCreate(data) {
    return request({
        method: "post",
        url: "/post",
        data
    })
}