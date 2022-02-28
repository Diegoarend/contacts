<template>
  <table id="customers">
    <thead >
      <tr>
          <th scope="col">Nome</th>
          <th scope="col">Sobrenome</th>
          <th class="adress" scope="col">Endereço</th>
          <th class="adress" scope="col">Complemento</th>
          <th scope="col">CPF</th>
          <th scope="col"></th>
          <th scope="col"></th>      
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.cpf">
        <td>{{item.name}}</td>
        <td>{{item.lastName}}</td>
        <td class="adress">{{item.adress}}</td>
        <td class="complement">{{item.complement}}</td>
        <td>{{item.cpf}}</td>
        <td>
          <Button @click="editUser(item)" type="button" text="Editar" blue></Button>
        </td>
        <td>
          <Button @click="openModal(item)" type="button" text="Excluir" red></Button>
        </td>                 
      </tr>
    </tbody>
  </table>
</template>
<script>
import {mapState} from 'vuex'
import Button from '@/components/Button.vue'
export default {
  name:"ContactWrapper",
  components: {
    Button
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapState([
      'users','current'
    ])
  },
  methods:{ 
    editUser(user){
      this.$emit('editUser',user)
    },
    openModal(user){
      this.$emit('openModal',user)
    }
  }
}
</script>
<style>

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  max-width: 960px;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 14px;
}

#customers button {
  margin: 5px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

@media screen and (max-width: 500px) {
  .adress,
  .complement {
    display: none;
  }
}
</style>

