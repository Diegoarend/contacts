<template>
  <div class="modal">
    <div>
      <span @click="closeModal()" class="close">&times;</span>
      <h2 class="modal-title">{{ isEditing  ? 'Editar Usuário' : 'Adicionar Usuário' }}</h2>      
      <form @submit.prevent="submits" class="form">
        <input type="text"  placeholder="Nome" v-model="formData.account.name" >
          <span  class='error-message'  v-if="errors.name">
            {{ errors.name}}
          </span>
        <input  type="text" placeholder="Sobrenome" v-model="formData.account.lastName">
        <input  type="text" placeholder="Endereço" v-model="formData.account.adress">
        <input  type="text" placeholder="Complemento" v-model="formData.account.complement">
        <input  type="text" placeholder="CPF"  v-model="formData.account.cpf">
        <span  class='error-message'  v-if="errors.cpf">
        {{ errors.cpf}}
        </span>
        <Button  type="button" submit blue text="Salvar"></Button>      
      </form>
    </div>
  </div>
</template>
<script>

import {mapState, mapActions, mapGetters} from 'vuex'
import Button from '@/components/Button.vue'

export default {
  name:"ModalUser",
  data () {
    return {
      formData: {
        account: {
          name: null,
          lastName: null,
          adress: null,
          complement:null,
          cpf: null,
        }
      },
      errors: {
        name:null,
        cpf:null
      }
    }
  },
  components: {
    Button
  },
   computed: {
    ...mapState(['users','current']),
    ...mapGetters(['userById','userByCpf']),
    isEditing () {
      return this.$route.meta.editing === true
    },
    isId() {    
      return this.$route.params.id
    }
  },

  methods: {
    ...mapActions([
    'createUsers',
    'getUserById',
    'updateUsers',
    'getUsers',
    'checkCpf'
  
    ]),
    checkFormFields(){
        if (this.formData.account.name && this.formData.account.cpf) {
          this.errors.name=null
          this.errors.cpf=null
        return true;
      }
       if (!this.formData.account.name) {
        this.errors.name='O campo nome é obrigatório';
      }
      if (!this.formData.account.cpf) {
        this.errors.cpf='O campo Cpf é obrigatório';
      }
    },
    submits(){
      if( this.checkFormFields() ) { 
        if (this.current.cpf !== this.formData.account.cpf) { 
        this.checkCpf(this.formData.account.cpf).then(res => {    
          if(res.status==200){
            this.errors.cpf=null
            this.isEditing ? this.submitUpdate() :  this.submitCreation()    
          }}).catch(this.errors.cpf='Este CPF já está registrado.')
          } else { 
            this.errors.cpf=null
            this.submitUpdate() 
          }
      }      
    },
    submitUpdate() {
      let params = {id: this.current.id, ...this.formData.account}
      this.updateUsers(params).then(this.closeModal())
    },
    submitCreation() {
      this.createUsers(this.formData.account).then(this.getUsers()).then(this.closeModal())      
    },
    closeModal () {
      this.$router.push(this.$route.meta.modalCloseLink)
    },
    fillEditingForm() {
      if (this.isEditing) {
      this.getUserById(this.$route.params.id).then((response) => {
        this.formData.account.name=response.name
        this.formData.account.lastName=response.lastName
        this.formData.account.adress=response.adress
        this.formData.account.complement=response.complement
        this.formData.account.cpf=response.cpf
      })
    }
    }
  },
  created () {
      this.fillEditingForm()
  }
}
</script>
<style>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: rgba(0,0,0,0.8);
    z-index: 99999;
    opacity:0;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
    pointer-events: none;
    opacity: 1;
    pointer-events: auto;
    text-align: center;
  }

  .modal > div {
    max-width:  400px;
    width:100%;
    position: relative;
    margin: 10% auto;
    padding: 15px 20px;
    background: #fff;
    border-radius: 20px;
  }

  .modal {
    opacity: 1;
    pointer-events: auto;
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .form {
    background-color: #fff;
    padding: 30px;
  }

  .error-message {
    font-size:14px;
    color:rgb(148, 127, 5)
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    font-size: 1.4em;
    padding: 5px 0;
    margin: 10px 0 5px 0;
    width: 100%;
  }

  .form button {
    display:block;
    padding: 10px 20px;
    margin: 10px auto;
    text-align: right;
  }
</style>