<script>
export default {
  name:'Button',
   props: {
    type: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    object: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    red:{
      type: Boolean,
      default: false
    },
    blue:{
      type: Boolean,
      default: false
    },
    green:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    triggerClickEvent (event) {
      this.type !== 'button' && event.preventDefault()
      this.$emit('click', event)
    },
    checkTypeButton () {
      return this.submit ? 'submit' : 'button'
    }
  }
}
</script>

<template>
  <button v-if="type == 'button'" class="btn"
    :type="checkTypeButton()"
    :class="[
      {
        'is-disabled': disabled,
        'is-submit': submit,
        'is-small': small,
        'is-large': large,
        'is-red': red,
        'is-green': green,
        'is-blue': blue,
      }
    ]"
    
    @click="triggerClickEvent"
    ref="elem">{{text}}
  </button>
</template>
<style>
  button {
    text-transform: none;
    cursor: pointer;
    border: none;
    padding:5px;
    color:#fff;
    border-radius:5px;
    margin: 10px 0px;
    font-size: 14px;
  }
  

  .is-small {
    font-size: 1.2em;
    padding: 0 12px;
    height: 24px;
  }

  .is-large {
    font-size: 1.6em;
    margin-top: 25px;
    padding: 0 20px;
    height: 40px;
  }

  .is-red {
  background-color: #db0d0d;
  }

  .is-blue {
  background-color: #3498db;
  }

  .is-green {
  background-color: #04AA6D;
  }
</style>