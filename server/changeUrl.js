/**
 * Created by lihui on 14-9-9.
 */


module.exports = function(mock2easy,req){

    var path = require('path');
    var fs = require('fs');
    var deferred = require('q').defer();
    var _json = {};

    var routeUrl = req.url;
    if (routeUrl.lastIndexOf(".") == -1)
        routeUrl = req.url + ".json";
    else {
        if (global.options.interfaceSuffix)
            routeUrl = req.url.replace(global.options.interfaceSuffix, '.json');
    }

    //var _url = req.url.replace(global.options.interfaceSuffix,'.json');

    fs.readFile(path.resolve(global.options.database)+routeUrl,'utf-8',function(err,data){
      if(err){
        mock2easy.error(err);
        deferred.reject(err);
      }else {
        if (data) {
          _json = JSON.parse(data);
          _json.interfaceUrl = req.newUrl;
          fs.unlinkSync(path.resolve(global.options.database)+routeUrl);
          require('./createInterface')(mock2easy,_json).then(function(){
              deferred.resolve();
          },function(err){
              deferred.reject(err);
          });
        }
      }
    });
  return deferred.promise;
}