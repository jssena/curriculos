<template>
 
</template>
<style lang="scss">
 
</style>
<script>
  export default {
  components: {
    asyncComponent: {
      props: {
        index: Number,
        id: Number,
        sent: Boolean,
        data: String,
        message: String
      },

      data () {
        return {
          asyncContent: null
        }
      },

      mounted () {
        this.timer = setTimeout(() => {
          this.asyncContent = {
            //sent: this.sent,
            name: this.nome,
             // avatar: this.sent === true ? 'https://cdn.quasar.dev/img/avatar4.jpg' : 'https://cdn.quasar.dev/img/avatar3.jpg',
            stamp: this.data,
            text: [ `${this.message}` ]
          }
        }, 300 + Math.random() * 2000)
      },

      beforeDestroy () {
        clearTimeout(this.timer)
      },

      render (h) {
        return h('q-chat-message', {
          staticClass: 'q-mx-sm',
          props: this.asyncContent === null
            ? {
              nome: this.nome
              text: [ `Retrieving message ${this.index}` ]
            }
            : this.asyncContent
        })
      }
    }
  }
  } 
</script>
