const path = require('path');
module.exports = {
  i18n: {
    locales: ['zh-CN', 'en-US'],

    defaultLocale: 'en-US',
    localePath: path.resolve('./public/locales'),
    // reloadOnPrerender: true,
  },
};
