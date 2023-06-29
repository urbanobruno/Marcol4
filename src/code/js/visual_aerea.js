
// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_viagensaero'));

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function exibeContatos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-contatos").html("");

    var usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    var usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

    var viagem_original = db.viagem; 

    db.viagem = db.viagem.filter(function (element) { return element.id_usuario == usuarioCorrente.id });

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db.viagem.length; i++) {
      let contato = db.viagem[i];
      $("#table-contatos").append(`<tr><td scope="row">${contato.id}</td>
                                              <td>${contato.estado_ida}</td>
                                              <td>${contato.aeroporto_ida}</td>
                                              <td>${contato.estado_destino}</td>
                                              <td>${contato.aeroporto_destino}</td>
                                              <td>${contato.num_passageiros}</td>
                                          </tr>`);
    }

    db.viagem = viagem_original;
  }

function deleteContato(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.viagem = db.viagem.filter(function (element) { return element.id != id });

    displayMessage("Viagem removida com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_viagensaero', JSON.stringify(db));
}