const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require("path");

const app = express();

app.engine('html', require('ejs').renderFile);
// View engine setup
app.set('view engine', 'ejs');

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/src/code'));

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { nome, email, senha } = req.body;

    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }

        // Insert usuarios data into the database
        const query = 'INSERT INTO usuarios (nome, email, senha, data_criacao_conta) VALUES (?, ?, ?, now())';
        connection.query(query, [nome, email, senha], (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {
                res.redirect('http://127.0.0.1:5000/login.html');
            }

            // Close the connection
            connection.end;
        });
    });

});


// Todo fix indicadores
// Handle form submission
app.post('/indicadores', (req, res) => {
    
    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }
        
        // todo check
        const query = 'SELECT  ( SELECT COUNT(*) / (SELECT COUNT(*) FROM usuarios) FROM usuarios WHERE data_criacao_conta >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) ) AS ind1, ( SELECT COUNT(*) / (SELECT COUNT(*) FROM ViagensAereas)  FROM ViagensAereas WHERE dia_cadastro >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) ) AS ind2, ( SELECT COUNT(*) / (SELECT COUNT(*) FROM ViagensOnibus) FROM ViagensOnibus WHERE dia_cadastro >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) ) AS ind3, ( SELECT COUNT(*) / (SELECT COUNT(*) FROM Hoteis)  FROM Hoteis WHERE dia_cadastro >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) ) AS ind4, (SELECT nome, COUNT(*) as Quantidade FROM Hoteis GROUP BY nome ORDER BY Quantidade DESC LIMIT 1) as ind5, (SELECT estado_destino, COUNT(*) as Quantidade FROM ViagensAereas GROUP BY estado_destino ORDER BY Quantidade DESC LIMIT 1) as ind6;';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {

                console.log(results);

                res.render(__dirname + "http://127.0.0.1:5000/indicadores.html", { 'data': results }); // render the index.html file with the retrieved data

            }

            // Close the connection
            connection.end;
        });
    });

});

app.post('/submit-form-membros', (req, res) => {
    const { nome, sobrenome, CPF, email, telefone, num_passaporte} = req.body;

    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }

        // Inserir Membro na database

        const query = 'INSERT INTO membros ( nome, sobrenome, cpf, email, telefone, numpassporte) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [nome, sobrenome, CPF, email, telefone, num_passaporte], (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {
                res.redirect('http://127.0.0.1:5000/index.html');
            }

            // Close the connection
            connection.end;
        });

    });
});

// Handle form submission - Cria clube db
app.post('/submit-form-clube', (req, res) => {
    const { nome, email, estado, cidade, telefone } = req.body;

    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }

        // todo 'UPDATE clube SET nome=?, email=?, estado=?, cidade=?, telefone=? WHERE id=?'

        // Insert data into the database
        const query = 'INSERT INTO Clube (nome, email, estado, cidade, telefone) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [nome, email, estado, cidade, telefone], (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {
                res.redirect('http://127.0.0.1:5000/meuclube.html');
            }

            // Close the connection
            connection.end;
        });
    });
});


// Handle form submission - Cria registro viagem aérea
app.post('/submit-form-viagem-aerea-bd', (req, res) => {
    const { estado, cidade, estado_destino, cidade_destino, num_passageiros } = req.body;

    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }

        // Insert data into the database
        const query = 'INSERT INTO ViagensAereas (estado_ida, aeroporto_ida, estado_destino, aeroporto_destino, num_passageiros, dia_cadastro) VALUES (?, ?, ?, ?, ?, now())';
        connection.query(query, [estado, cidade, estado_destino, cidade_destino, num_passageiros], (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {
                res.redirect('http://127.0.0.1:5000/index.html');
            }

            // Close the connection
            connection.end;
        });
    });
});


// Handle form submission - Cria registro viagem onibus
app.post('/submit-form-viagem-onibus-bd', (req, res) => {
    const { estado, cidade, estado_destino, cidade_destino, num_passageiros } = req.body;

    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }

        // Insert data into the database
        const query = 'INSERT INTO ViagensOnibus (estado_ida, cidade_ida, estado_destino, cidade_destino, num_passageiros, dia_cadastro) VALUES (?, ?, ?, ?, ?, now())';
        connection.query(query, [estado, cidade, estado_destino, cidade_destino, num_passageiros], (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {
                res.redirect('http://127.0.0.1:5000/index.html');
            }

            // Close the connection
            connection.end;
        });
    });
});

// Handle form submission - Cria registro viagem onibus
app.post('/submit-form-hotel-bd', (req, res) => {
    const { estado, cidade, data_ida, data_volta, nome_hotel } = req.body;

    console.log(data_ida);
    console.log(data_volta);


    // Connect to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno3547',
        database: 'Marcol'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the MySQL database:', error);
            res.status(500).send('Error connecting to the MySQL database');
            return;
        }

        // Insert data into the database
        const query = 'INSERT INTO Hoteis (estado, cidade, data_chegada, data_saida, dia_cadastro, nome) VALUES (?, ?, ?, ?, now(), ?)';
        connection.query(query, [estado, cidade, data_ida, data_volta, nome_hotel], (error, results) => {
            if (error) {
                console.error('Error inserting data into the MySQL database:', error);
                res.status(500).send('Error inserting data into the MySQL database');
            } else {
                res.redirect('http://127.0.0.1:5000/index.html');
            }

            // Close the connection
            connection.end;
        });
    });
});




// Start the server
// const PORT = process.env.PORT || 5500;
//app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}`);
//});


// Start the server
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 5000;
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

