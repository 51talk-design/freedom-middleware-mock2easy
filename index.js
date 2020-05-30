var options = {
  port: 8080,
  lazyLoadTime: 3000,
  database: 'mock2easy',
  doc: 'doc',
  keepAlive: true,
  isSpider: false,
  ignoreField: [],
  interfaceSuffix: '',
  interfaceRule: "",
  preferredLanguage: 'cn'
};


module.exports = async function (opts) {
  options.port = opts.port;
  options.doc = opts.doc || 'doc';
  options.database = opts.database || 'mock2easy';
  require('./start')(options, function (app) {
    try {
      app.listen(options.port, function () {
        console.log(('mock2easy is starting , please visit : http://localhost:' + options.port).bold.cyan);
      });
    } catch (e) {
      console.log(e);
    }
  });
};