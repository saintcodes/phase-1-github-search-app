const userList = document.querySelector('#user-list')
userList.innerHTML = "User List"

const reposList = document.querySelector('#repos-list')
reposList.innerHTML = "User Repos"

const searchField = document.querySelector('#search').value
const submit = document.querySelector("#github-form").childNodes[3]

fetch('https://api.github.com/users')
  .then(res => res.json())
  .then(userData => {
    userData.forEach(renderUser)
    searchUser(userData)
  })

function renderUser(user) {
  let username = document.createElement('li')
  username.innerHTML = user.login
  username.addEventListener('click', (e) => {
    fetch(`https://api.github.com/users/${e.target.textContent}/repos`)
      .then(res => res.json())
      .then(userRepo => userRepo.forEach(userRepo => {
        let userRepos = document.createElement('li')
        userRepos.innerHTML = userRepo.name
        reposList.append(userRepos)
      }))
  })
  userList.append(username)
}
