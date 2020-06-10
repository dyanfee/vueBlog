import { getPostsByPage } from "network/home";
export const fetchPostMixin = {
    data() {
        return {
            posts: [],
            currentPage: 1,
            list: [],
            limit: 10,
            total: 0,
            loading: false
        };
    }, methods: {
        /** 获取首页文章数据 */
        getPosts(val = 1) {
            this.loading = true
            getPostsByPage({
                page: val,
                limit: this.limit
            }).then(res => {
                this.posts.push(res);
                this.showPostsByPage();
                this.total = res.total
                setTimeout(() => {
                    this.loading = false

                }, 500);
            });
        },
        showPostsByPage() {
            this.list = [];
            this.list.push(...this.findLocalPosts(this.currentPage));
        },
        pageChange(index) {
            this.currentPage = index;
            if (!this.findLocalPosts(index).length) {
                this.getPosts(index);
                return;
            }
            this.showPostsByPage();
        },
        findLocalPosts(index) {
            for (let i = 0; i < this.posts.length; i++) {
                let tar = this.posts[i];
                if (Number(tar.page) == index) {
                    return tar.posts;
                }
            }
            return [];
        }
    }
}