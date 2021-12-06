const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var DB = {
    perfumes: [
        {
            id: 1,
            nome: "florata red",
            preco: 200.00
        },
        {
            id: 2,
            nome: "Zaad",
            preco: 180.00
        },
        {
            id: 4,
            nome: "Egeo",
            preco: 185.00
        },
        {
            id: 8,
            nome: "Glamour",
            preco: 170.00
        }
    ]
};

app.get("/perfumes", (req, res) =>{
    res.statusCode = 200;
    res.json(DB.perfumes);
});

app.get("/perfumes/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)){
        res.sendStatus(400);
    }else{
        var perfume = DB.perfumes.find(g => g.id == id);
        if(perfume != undefined){
            res.statusCode = 200;
            res.json(perfume);
        }else{
            res.sendStatus(404);
        }
    } 
})

app.post("/perfumes", (req, res) => {
    let {id, nome, preco} = req.body;
    if( DB.perfumes.find(g => g.id == id))
        res.sendStatus(404);
    else{
        if (isNaN(id)){
            res.sendStatus(400);
        }else{
            DB.perfumes.push({
                id: id,
                nome: nome,
                preco: preco
            });
            res.sendStatus(200);
        }
    }
})

app.delete("/perfumes/:id",  (req, res) => {
    var id = req.params.id;
    if (isNaN(id)){
        res.sendStatus(400);
    }else{
        var index = DB.perfumes.findIndex(g => g.id == id);
        if(index != -1){
            DB.perfumes.splice(index, 1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    } 
})

app.put("/perfumes/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)){
        res.sendStatus(400);
    }else{
        var perfume = DB.perfumes.find(g => g.id == id);
        if(perfume != undefined){
            let {nome, preco} = req.body;
            if(nome !=undefined)
                perfume.nome = nome
            
            if (preco != undefined)
                perfume.preco = preco

            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    } 
})

app.listen(1231,() =>{
    console.log("api rodando");
})