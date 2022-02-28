<template>
  <div class="container">
    <Button @click="openModalUser" large type="button" red text="Criar usuário"></Button>
      <ContactWrapper  :items="users" @editUser="editUser" @openModal="openModalConfirm"> </ContactWrapper>
      <ModalConfirmation :ModalConfirm="ModalConfirm" v-show="ModalConfirm" v-model="ModalConfirm" @confirmDelete="confirmDelete"  @closeModalConfirm="closeModalConfirm"></ModalConfirmation>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContactWrapper from '@/components/ContactWrapper.vue'
import ModalConfirmation from '@/components/ModalConfirmation.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Users',
  data() {
    return {
      ModalConfirm : false,
      userToDelete:{}

    }
  },
  components: {
    ContactWrapper,
    ModalConfirmation,
    Button
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState([
      'users','current'
    ])
},
  methods: {
    ...mapActions(['getUsers','deleteUser']),
    openModalUser () {
      this.$router.push({ path: '/users/create' })
    },
    editUser(e) {
      this.$router.push({ name: 'edit', params: { id: e.id }})
    },
    confirmDelete() {
      this.deleteUser(this.userToDelete)
      this.ModalConfirm = false
    },
    openModalConfirm(value) {
        this.ModalConfirm = true
        this.userToDelete=value
      },
      closeModalConfirm() {
        this.ModalConfirm = false
      }   
  }
}
</script>

