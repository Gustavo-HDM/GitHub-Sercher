const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `  <div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <small>Followers: ${user.followers}</small>
                                                
                                                <small>Following: ${user.following}</small>
                                                <br>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            </div>
                                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {

            let repoLanguage = repo.language
            if (repoLanguage === null || repoLanguage === undefined) {
                repoLanguage = '❌'
            } 

            repositoriesItens += `  <li>
                                        <a href="${repo.html_url}" target="_blank">
                                            <div class="repo-name">${repo.name}</div>
                                            <div class="repo-icons">
                                                <span><i>🍴</i>${repo.forks_count}</span>
                                                <span><i>⭐</i>${repo.stargazers_count}</span>
                                                <span><i>👀</i>${repo.watchers_count}</span>
                                                <span><i>🖥️</i>${repoLanguage}</span>
                                            </div>
                                        </a>
                                    </li>`

        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventItens = ''
        user.events.forEach(event => {

            if (event.type === 'PushEvent' && event.payload.commits.length > 0) {
                const commitMessage = event.payload.commits[0].message
                eventItens += `<li><a href="${event.repo.url}" target="_blank">${event.type} -> ${commitMessage}</a></li>`
            } else if (event.type === 'CreateEvent') {
                eventItens += `<li><a href="${event.repo.url}" target="_blank">${event.type} -> Sem mensagem de commit</a></li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += ` <div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventItens}</ul>
                                            </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}
export { screen }