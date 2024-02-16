import { baseUrl, repositoriesQuantity } from '../variables.js'

async function getRepos(userName){
    const response = await fetch(baseUrl + userName + '/repos' + (isNaN(repositoriesQuantity) ? '' : '?per_page=' + repositoriesQuantity));
    return await response.json();
}

export { getRepos }