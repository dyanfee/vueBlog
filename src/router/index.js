import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"
Vue.use(VueRouter)
import Home from "views/Home";
// const Home = () => import("views/Home");
const ListPosts = () =>
    import("components/ListPosts")
const About = () =>
    import("components/About")
const Tags = () =>
    import("components/Tags")
const Category = () =>
    import("components/Category")
const PostDetail = () =>
    import("components/PostDetail")
const Archive = () =>
    import("components/Archive")
const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: ListPosts,
                meta: { auth: false },
                props: { dataName: "home" }
            },
            {
                path: '/about',
                component: About,
                meta: { auth: false }
            },
            {
                path: '/tags',
                component: Tags,
                meta: { auth: false }
            },
            {
                path: '/tags/:id',
                component: ListPosts,
                meta: { auth: false },
                props: { dataName: "tag" }
            },
            {
                path: '/categories',
                component: Category,
                meta: { auth: false }
            },
            {
                path: '/categories/:id',
                component: ListPosts,
                meta: { auth: false },
                props: { dataName: "category" }
            },
            {
                path: '/archives',
                component: Archive,
                meta: { auth: false }
            },
            {
                // 直接传参路由
                path: '/post/:id',
                component: PostDetail,
                meta: { auth: false }
            },
        ]
    },
    {
        path: '/admin',
        component: () =>
            import('views/admin/Admin'),
        children: [
            {
                path: '',
                redirect: "posts"
            },
            {
                path: "posts",
                name: "文章列表",
                component: () => import("views/admin/AdminPosts")
            },
            {
                path: "profile",
                name: "个人信息",
                component: () => import("views/admin/AdminProfile")
            },
            {
                path: "postEdit",
                name: "文章编辑",
                component: () => import("views/admin/AdminPostEdit")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("views/admin/Login")
    },
    //  {
    //     // 默认跳转页面为显示所有文章
    //     path: '*',
    //     redirect: "/"
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior
})

const scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 }
}
router.beforeEach((to, from, next) => {
    let { auth = true } = to.meta
    let isAuth = Boolean(store.state.token)
    if (auth && !isAuth && to.path != "/login")
        return next({ path: "/login" })

    if (isAuth && to.path == "/login")
        return next({ path: "/admin" })
    next()
})

export default router