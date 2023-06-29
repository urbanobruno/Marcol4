var db_hoteis = {};

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = {
    viagem: [
      { "id": generateUUID(), "estado": "MG", "cidade": "Bh", "data_ida": "18/09/2023", "data_volta": "25/09/2023", "id_usuario": "2"},
    ]
  };
  
  // Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initHotel() {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    //usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    //if (usuarioCorrenteJSON) {
    //  usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    //}
  
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var membrosJSON = localStorage.getItem('db_hoteis');
  
    // Verifica se existem dados já armazenados no localStorage
    if (!membrosJSON) {  // Se NÃO há dados no localStorage
  
      // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
      alert('Dados de viagens não encontrados no localStorage.');
  
      // Copia os dados iniciais para o banco de dados 
      db_hoteis = dadosIniciais;
  
      // Salva os dados iniciais no local Storage convertendo-os para string antes
      localStorage.setItem('db_hoteis', JSON.stringify(dadosIniciais));
    }
    else {  // Se há dados no localStorage
  
      // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
      db_hoteis = JSON.parse(membrosJSON);
    }
  };


  function addHotel(estado, cidade, data_ida, data_volta) {
    // Cria um objeto de usuario para o novo usuario 
    let newId = generateUUID();

    var usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    var usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

    let hotel = {"id": newId, "estado": estado, "cidade": cidade, "data_ida": data_ida, "data_volta": data_volta, "num_passageiros": num_passageiros, "id_usuario": usuarioCorrente.id };

    // Inclui o novo usuario no banco de dados baseado em JSON
    db_hoteis.viagem.push(hotel);
  
    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_hoteis', JSON.stringify(db_hoteis));
  
  }


  initHotel()