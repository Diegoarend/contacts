<template>
  <div class="modal" v-if="ModalConfirm">
    <div>
      <h3>Ao realizar esta ação você irá excluir este item</h3>
      <div class="buttons">
        <Button @click="closeModalConfirm" type="button" blue text="Cancelar"></Button>
        <button @click="confirmDelete" class="is-red">Excluir</button>  
      </div>
    </div>   
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
  export default {
    name: 'ModalConfirmation',
    components: {
      Button
    },
    props: {
        ModalConfirm: Boolean
    },
    methods: {
      closeModalConfirm() {
        this.$emit("closeModalConfirm");
      },
      confirmDelete() {
        this.$emit("confirmDelete");
      }              
    }
  };
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
  width: 400px;
  position: relative;
  margin: 10% auto;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;
}

.modal .buttons {
  display: flex;
  justify-content:space-around ;
}

@media screen and (min-width: 500px) {
  .modal > div {
    max-width: 500px;
    width: 100%;
  }
}


</style>