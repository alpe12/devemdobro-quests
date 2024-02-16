const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
            <div class="data">
                <h1>${user.name ?? 'Não possui nome cadastrado.'}</h1>
                <p>${user.bio ?? 'Não possui bio cadastrada.'}</p>
                <br>
                <p>👥 ${user.followers} Seguidores</p>
                <p>👥 ${user.following} Seguindo</p>
            </div>
        </div>`;
        
        if (user.repositories.length > 0){
            let repositoriesItems = "";
            user.repositories.forEach(repo => {
                repositoriesItems += `
                    <li>
                        <a href="${repo.html_url}" target="_blank">
                            ${repo.name}
                            <ul>
                                <li>🍴 ${repo.forks}</li>
                                <li>⭐ ${repo.stargazers_count}</li>
                                <li>👀 ${repo.watchers_count}</li>
                                ${repo.language === null ? '' : '<li>📚 ' + repo.language + '</li>'}
                            </ul>
                        </a>
                    </li>`;
            });
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>${repositoriesItems}</ul>
                </div>`;
        }

        if (user.events.length > 0){
            let eventsItems = "";
            user.events.forEach(event => {
                let msg;
                if (event.type === 'PushEvent'){
                    msg = event.payload.commits[0].message;
                    if (event.payload.commits.length > 1 || msg.length === 0){
                        msg += ` [${event.payload.commits.length} commits]`;
                    }
                } else {
                    msg = 'Created ' + event.payload.ref_type;
                    if (event.payload.ref_type !== 'repository') msg += ' ' + event.payload.ref;
                }
                eventsItems += `<tr><td><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></td><td>${msg !== undefined ? msg : ''}</td></tr>`;
            });
            this.userProfile.innerHTML += `
                <div class="events">
                    <h2>Eventos</h2>
                    <table>${eventsItems}</table>
                </div>`;
        }
    },
    renderError(msg){
        this.userProfile.innerHTML = `<h3>${msg}</h3>`;
    }
}

Object.freeze(screen); //prevent accidental modification

export { screen }