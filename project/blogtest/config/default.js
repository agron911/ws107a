const path = require('path');

module.exports = {
    port: process.env.PORT || 3001,
    keys: ["I am the key"],
    tabs: ['所有','有趣','學術','新聞'],
    mongodb: {
        url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/club'
    },
    schemeConf: path.join(__dirname, './scheme'),
    staticConf: path.join(__dirname, '../public'),
    locale: 'zh-cn'
};