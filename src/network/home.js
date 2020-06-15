import { request } from './request'

export function getAllPosts() {
    return request({
        url: "/posts",
    })
}

// 获取文章详细内容
export function getPostDetail(data) {
    return request({
        url: `/post`,
        params: data
    })
}

export function getPostsByPage(params) {
    return request({
        url: `postList`,
        params
    })
}
// 获取文章统计信息
export function getPostStat() {
    return request({
        url: `/poststat`,
    })
}

// 获取所有分类
export function getAllCates() {
    return request({
        url: "/allCategories"
    })
}

// 获取所有标签
export function getAllTag() {
    return request({
        url: "/allTags"
    })
}

// 分类查询
export function getCate(params) {
    console.log(params);

    return request({
        url: "/category",
        params
    })
}

// 标签查询
export function getTag(params) {
    return request({
        url: "/tag",
        params
    })
}

// 发表评论
export function sendComment(data) {
    return request({
        method: "post",
        url:"/comment",
        data
    })
}