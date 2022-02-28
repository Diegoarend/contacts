
import UsersController from './controllers/UsersController'

export default function (App) {
  App.get('/users', UsersController.list)
  App.post('/users/create', UsersController.create)
  App.get('/users/edit/:id', UsersController.find)
  App.get('/users/validate/:cpf', UsersController.findCpf)
  App.put('/users/edit/:id', UsersController.update)
  App.delete('/users',UsersController.delete)
}
