/**
 * Created by ichetandhembre on 18/2/14.
 */

module.exports = {
    'PUBLIC_USER_URL' : 'https://api.github.com/users/{user}',
    'PUBLIC_USER_ORGS_URL' : 'https://api.github.com/users/{user}/orgs?page={page}&per_page={per_page}',
    'PUBLIC_ORG_URL' : 'https://api.github.com/orgs/{org}',
    'PUBLIC_USER_REPO_URL' : 'https://api.github.com/users/{user}/repos?page={page}&{queryString}',
    'PUBLIC_REPO_PACKAGE_JSON_URL' : 'https://api.github.com/repos/{owner}/{repo}/contents/package.json'
};
