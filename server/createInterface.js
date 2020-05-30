/**
 * Created by lihui on 14-9-9.
 */


module.exports = function (mock2easy, body) {
    var path = require('path');
    var fs = require('fs');
    var deferred = require('q').defer();

    var _arry = body.interfaceUrl.split('\/');
    delete _arry[_arry.length - 1];
    if (!!!body.interfaceName) {
        body.interfaceName = body.interfaceUrl;
    }
    var routeUrl = body.interfaceUrl;
    if (routeUrl.lastIndexOf(".") == -1)
        routeUrl = body.interfaceUrl + ".json";
    else {
        if (global.options.interfaceSuffix)
            routeUrl = body.interfaceUrl.replace(global.options.interfaceSuffix, '.json');
    }
    require('../util/createFile')(path.resolve(global.options.database) + routeUrl, JSON.stringify(body), mock2easy).then(function () {
        deferred.resolve();
    }, function (err) {
        deferred.reject(err);
    });

    return deferred.promise;

}