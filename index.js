//index.js
(async () => {
    const db = require("./db");
    console.log('Começou!');
    
    console.log('INSERT INTO CLUBE');
    const result = await db.insertClube({nome: "Galo", email: "galo@gmail.com", estado: "MG", cidade: "Belo Horizonte", telefone: "31988885555"});
    console.log(result);
 
    console.log('SELECT * FROM CLUBE');
    const clientes = await db.selectClube();
    console.log(clientes);

    // console.log('UPDATE CLUBE');
    // const result2 = await db.updateClube(1, {nome: "Galo", email: "galo@gmail.com", estado: "MG", cidade: "Belo Horizonte", telefone: "31988885555"});
    // console.log(result2);

    // console.log('DELETE FROM CLUBE');
    // const result3 = await db.deleteClube(1);
    // console.log(result3);
})();

