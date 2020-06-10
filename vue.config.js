module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "assets": '@/assets',
                "common": '@/common',
                "components": '@/components',
                "network": '@/network',
                "views": '@/views',
            }
        },
        devServer: {
            open: true,
            // host: 'localhost',
            // port: 8080,
            https: false,
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3000/api',
                    // 允许跨域
                    changeOrigin: true,
                    ws: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    }
}