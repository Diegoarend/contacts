import { createRouter, createWebHashHistory } from 'vue-router'
import Users from '../views/Users.vue'


const routes = [
  {
    path: '/users',
    name: 'users',
    component: Users,
    children: [
      {
        name: 'create',
        path: 'create',
        component: () => import(/* webpackChunkName: "about" */ '../components/ModalUser.vue'),
        meta: {
          modalCloseLink: { name: 'users' }
        }
      },
      {
        name: 'edit',
        path: 'edit/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/ModalUser.vue'),
        meta: {
          editing: true,
          modalCloseLink: { name: 'users' }
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
