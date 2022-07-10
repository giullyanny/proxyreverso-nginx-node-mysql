const express = require('express')
const app = express()

app.use(express.json());

const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};


const mysql = require('mysql')
const conn = mysql.createConnection(config)

let sql = `create table if not exists pessoa (id INT(5) AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(20) NOT NULL)`
conn.query(sql)

app.get('/', async (req, res) => {

    var dados = "<h1>Full Cycle!</h1>";
    const nome = 'eduardo'

    if (nome != null || nome != "" || nome != ' favicon.ico' || nome != 'undefined') {
        sql = `INSERT INTO pessoa (nome) values('${nome}')`
        await conn.query(sql)
    }


    await conn.query('select * from pessoa', function (err, results) {
        try {
            for (let i = 0; i < results.length; i++) {
                var d = results[i]
                var id = d["id"]
                var name = d["nome"]
    
                dados = (dados + '<p>' + id + '- ' + name + '</p>')
            }
    
            res.send(dados)
        } catch (error) {
            throw error
        }
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})