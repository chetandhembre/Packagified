/**
 * Created by ichetandhembre on 6/3/14.
 */


var getDependenciesPackages = function(packageJSON) {
    var devependencies = [];

    if(packageJSON.dependencies) {
        for(var packages in packageJSON.dependencies) {
            devependencies.push(packages);
        }
    }

    if(packageJSON.devDependencies) {
        for(var packages in packageJSON.devDependencies) {
            devependencies.push(packages);
        }
    }

    if(packageJSON.devDependencies) {
        for(var packages in packageJSON.devDependencies) {
            devependencies.push(packages);
        }
    }

    if(packageJSON.optionalDependencies) {
        for(var packages in packageJSON.optionalDependencies) {
            devependencies.push(packages);
        }
    }

    if(packageJSON.bundledDependencies) {
        devependencies = devependencies.concat(packageJSON.bundledDependencies);
    }

    return devependencies;
};

exports.getDependencies = getDependenciesPackages;

var testGetDependencies = function() {
    var npmPackageJSON = require('../../../Api-Response/github/npmPackage.json');
    console.log(getDependenciesPackages(npmPackageJSON));
}

//testGetDependencies();
