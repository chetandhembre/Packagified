/**
 * Created by ichetandhembre on 10/3/14.
 */

module.exports = {
    FETCH_USER : require('./fetchUser'),
    FETCH_ORGS : require('./fetchUserOrgs'),
    FETCH_ORG : require('./fetchOrganization'),
    FETCH_REPO : require('./fetchUserRepos'),
    FETCH_PACKEGE_INFO: require('./fetchPackageJSONGithub'),
    PACKAGE_PARSE : require('./packageJSON'),
    SELECT_JS_REPO : require('./selectJSRepo')
};