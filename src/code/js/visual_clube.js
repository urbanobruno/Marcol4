// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_clube'));

function exibeContatos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-contatos").html("");

    var usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    var usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

    var viagem_original = db.clube; 

    db.clube = db.clube.filter(function (element) { return element.id_usuario == usuarioCorrente.id });

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < 1; i++) {
      let contato = db.clube[i];
      $("#table-contatos").append(`<tr><td scope="row" class="text-white"></td>
                                              <td class="text-white">${contato.nome}</td>
                                              <td class="text-white">${contato.email}</td>
                                              <td class="text-white">${contato.estado}</td>
                                              <td class="text-white">${contato.cidade}</td>
                                          </tr>`);
    }

    db.clube = viagem_original;
  }

