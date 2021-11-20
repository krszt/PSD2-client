module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config.externals({
            Configuration: "Configuration"
        });
    }
};