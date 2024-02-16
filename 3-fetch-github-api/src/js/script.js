import { getUser } from './services/user.js'
import { getRepos } from './services/repositories.js'
import { getEvents } from './services/events.js'
import { User } from './objects/user.js'
import { screen } from './objects/screen.js'

function getUserData(userName){
    getUser(userName).then(userData => {
        if (userData.hasOwnProperty('message')) throw userData;
        const user = new User;

        user.setInfo(userData);
        screen.renderUser(user); //don't wait for the repositories/events query before rendering user info. for faster partial display on slow network.

        getRepos(userName).then(reposData => {
            user.setRepositories(reposData);
            screen.renderUser(user);
        });

        getEvents(userName).then(eventsData => {
            user.setEvents(eventsData);
            screen.renderUser(user);
        });
    }).catch(err => {
        //catch any error (eg: network error, api limit) and display it
        let msg = (err.message || err);
        if (msg === 'Not Found') msg = 'Usuário não encontrado.';
        if (err.hasOwnProperty('documentation_url')) msg = `<a href="${err.documentation_url}" target="_blank">${msg}</a>`;
        screen.renderError(msg);
    });
}

function validateSearch(userName){
    if (userName.length === 0){
        screen.renderError('Preencha o campo com o nome de usuário do GitHub.')
        return false;
    }
    if (!new RegExp(/^([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))$/, 'i').test(userName)){
        screen.renderError('Usuário inválido.');
        return false;
    }
    return true;
}

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if (validateSearch(userName)) getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    if ((e.which || e.keyCode || 0) === 13){
        const userName = e.target.value;
        if (validateSearch(userName)) getUserData(userName);
    }
});