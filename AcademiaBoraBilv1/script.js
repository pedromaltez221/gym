class Users {
    constructor(id, name, especialidade, dtNasc, genero){
        this.id = id;
        this.name = name;
        this.especialidade = especialidade;
        this.dtNasc = dtNasc;
        this.genero = genero;
    }
}

class UI {
    static displayUsers(){
        const users = Store.getUsers();

        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user) {
        const list = document.querySelector('#user-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.especialidade}</td>
            <td>${user.dtNasc}</td>
            <td>${user.genero}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    }

    static deleteUser(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showNotification(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#user-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    //limpar campos
    static clearFileds(){
        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#especialidade').value = '';
        document.querySelector('#dtNasc').value = '';
        document.querySelector('#genero').value = '';
    }
}

//local storage
class Store {
    static getUsers(){
        let users;
        if(localStorage.getItem('users') === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static addUser(user){
        const users = Store.getUsers();

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(id){
        const users = Store.getUsers();

        users.forEach((user, index) => {
            if(user.id === id){
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayUsers);

//add usuario
document.querySelector('#user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const especialidade = document.querySelector('#especialidade').value;
    const dtNasc = getAge();
    const genero = document.querySelector('#genero').value;

    // validar
    if(id === '' || name === '' || especialidade === '' || dtNasc === '' || genero === ''){
        UI.showNotification('Preencha todos os campos', 'danger');
    }else{
        const user = new Users(id, name, especialidade,dtNasc,genero);

        //adicionar usuario na lista
        UI.addUserToList(user);
        //adicionar usuario no storage
        Store.addUser(user);

        UI.showNotification('Usuario Cadastrado', 'success');

        UI.clearFileds();
    }
});

//remover usuario
document.querySelector('#user-list').addEventListener('click', (e) => {

    //removendo da tela
    UI.deleteUser(e.target);

    //removendo do storage
    Store.removeUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)

    UI.showNotification('Usuario Removido', 'success');
});
//transformando data de nascimento em idade
function getAge(){
    
    let aux = document.querySelector('#dtNasc').value;
    console.log(aux);
    data = new Date(aux);
    let today = new Date().getFullYear();
    let ano = data.getFullYear();
    console.log(ano);

    return today - ano;
}
if ('serviceWorker' in navigator) {
   //registrar SW
    navigator.serviceWorker.register('/borabillgym-sw.js').then((registration) => {
      console.log('SW Registrado:', registration);
    }, (error) => {
      console.error(`Falha ao registrar SW ${error}`);
    });
  } else {
    console.error('SW não suportado.');
  }

