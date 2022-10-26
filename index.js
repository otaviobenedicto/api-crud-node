const express = require('express')
const server = express()
const router = express.Router()
const fs = require('fs')

server.use(express.json({ extend: true }))
server.use(router)

// GET -  Mostrar Valores

const readFile = () => {
    const content = fs.readFileSync('./data/items.json', 'utf-8')
    return JSON.parse(content)
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})

// POST - Adicionar Valores

const writeFile = (content) =>{
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./data/items.json',updateFile, 'utf-8')
}

router.post('/', (req, res) => {
    const {name,email,phone} = req.body
    const currentContent = readFile()
    const id = Math.random().toString(32).substring(2,9)
    currentContent.push({id,name,email,phone})
    writeFile(currentContent)
    res.send(currentContent)
})

// PUT - Alterar Valores

router.put('/:id', (req, res) => {
    const {id} = req.params

    const {name,email,phone} = req.body

    const currentContent = readFile()

    const selectedItem = currentContent.findIndex((item)=>item.id === id)

    const {id:cId,name: cName,email: cEmail,phone: cPhone} = currentContent[selectedItem]

    const newObject = {
        id: id ? id : cId,
        name: name ? name:cName,
        email: email ? email:cEmail,
        phone: phone ? phone:cPhone
    }

    writeFile(newObject)

    currentContent[selectedItem] = newObject
    res.send(newObject)
})

// DELETE - Deletar Valores
router.delete('/:id', (req, res) => {
    const {id} = req.params
    const currentFile = readFile()
    const selectedItem = currentContent.findIndex((item)=>item.id === id)
    console.log(selectedItem)
    currentContent.splice(selectedItem,1)
    writeFile(currentContent)
    res.send(true)
})

server.listen(3000, () => {
    console.log('Rodando Servidor!')
})