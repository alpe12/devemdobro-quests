import { eventsQuantity } from '../variables.js'

class User {
    constructor() {
        this.avatarUrl = '';
        this.name = '';
        this.bio = '';
        this.userName = '';
        this.followers = '';
        this.following = '';
        this.repositories = [];
        this.events = [];
    }

    setInfo(githubData) {
        this.avatarUrl = githubData.avatar_url;
        this.name = githubData.name;
        this.bio = githubData.bio;
        this.userName = githubData.login;
        this.followers = githubData.followers;
        this.following = githubData.following;
    }

    setRepositories(repositories) {
        this.repositories = repositories.map(
            ({ name, html_url, forks, stargazers_count, watchers_count, language }) => ({ name, html_url, forks, stargazers_count, watchers_count, language })
        );
    }

    setEvents(events){
        this.events = events.filter(obj => obj['type'] === 'CreateEvent' || obj['type'] === 'PushEvent');
        if (!isNaN(eventsQuantity)) this.events.splice(eventsQuantity);
    }
}

export { User }