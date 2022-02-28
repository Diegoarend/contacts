import FS from 'fs'
const crypto = require("crypto");
const users = require('../../__mocks__/users.json')


export default {
  list (req, res) {
    const data = users
    res.status(200).send({ data })
  },
  create (req, res) {
    const requisition = req.body
    const {cpf} = requisition
    const id = crypto.randomBytes(16).toString("hex");
    const payload = { id, ...requisition }

    users.push(payload)

    FS.writeFileSync('__mocks__/users.json', JSON.stringify(users))

    res.status(200).send({
      data: payload,
      message: 'Cadastro realizado com sucesso'
    })
  },
  findCpf (req, res) {
    const {cpf} = req.params
    if (users.find(user => user.cpf === cpf )) {
      res.status(400).send({ message: 'Esse cpf já existe' })
      console.log('já existe')
      return
    }

    res.status(200).send({ message: 'Cpf não utilizado' })
  },

  find (req, res) {
    const {id} = req.params
    const user = users.find(user => user.id === id)
    if (!user) {
      res.status(400).send({ message: 'Nenhum user com este id foi encontrada' })
      return
    }
    res.status(200).send({ user})
    },

  update (req, res) {
    const requisition= req.body
    const {cpf} =requisition

    const payload = users.map(user => {
      if (user.id === req.params.id) {
        user = {...requisition }
      }
      return user
    })

    FS.writeFileSync('__mocks__/users.json', JSON.stringify(payload))

    res.status(200).send({
      data: [payload],
      message: 'user atualizado com sucesso'
    })
  },

  delete (req, res) {
    const userIndexToRemove = users.findIndex(user => user.id === req.body.data.id);
    users.splice(userIndexToRemove,1)
    FS.writeFileSync('__mocks__/users.json', JSON.stringify(users))

    res.status(200).send({
      data:users,
      message: 'user deletado com sucesso'
    })
  }
}
