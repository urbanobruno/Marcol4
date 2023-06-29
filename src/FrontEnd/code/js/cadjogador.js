
// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_membros'));

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function exibeContatos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-contatos").html("");

    var usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    var usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

    var viagem_original = db.membro; 

    db.membro = db.membro.filter(function (element) { return element.id_usuario == usuarioCorrente.id });

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db.membro.length; i++) {
      let contato = db.membro[i];
      $("#table-contatos").append(`<tr><td scope="row">${contato.id}</td>
                                              <td>${contato.nome}</td>
                                              <td>${contato.sobrenome}</td>
                                              <td>${contato.cpf}</td>
                                              <td>${contato.email}</td>
                                              <td>${contato.telefone}</td>
                                              <td>${contato.num_passaporte}</td>
                                          </tr>`);
    }

    db.membro = viagem_original;
  }

function deleteContato(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.membro = db.membro.filter(function (element) { return element.id != id });

    displayMessage("Membro removida com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_membros', JSON.stringify(db));
}