function searchUser(){
    let a = JSON.parse(localStorage.getItem('users'));
    let nomePesquisa = document.getElementById('buscare').value;
    var aux = false;
    nomePesquisa = nomePesquisa.toUpperCase();
    var array = [];
    a.forEach(element => {
        array.push(element.name.toUpperCase());
    });
    for(let i = 0; i<array.length;i++){
        if(array[i] === nomePesquisa){
            aux = true;
        }
    }
    if(aux === true){
        alert('usuario encontrado ' +nomePesquisa);
    }
    else{
        alert('usuario não encontrado ' +nomePesquisa);
    }
}