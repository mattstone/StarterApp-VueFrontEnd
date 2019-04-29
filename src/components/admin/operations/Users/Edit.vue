<template>
  <div>
    <h2>Edit</h2>
  </div>
</template>

<script>

import Flash from '../../../includes/Flash'
import User from '../../../../../models/User.js'

// import axios from 'axios'

export default {
  name: 'AdminUsers',
  props: ['id'],
  components: {
    Flash
  },
  data () {
    return {
      info: '',
      success: '',
      warning: '',
      error: '',
      errors: [],
      isShowSpinner: false,
      model: null,
      models: []
    }
  },
  mounted: function () {
    this.model = new User()
    this.get(this.$props.id)
  },
  methods: {
    clearFlash: function () {
      this.info = ''
      this.success = ''
      this.warning = ''
      this.error = ''
      this.errors = []
    },
    showSpinner: function () {
      this.isShowSpinner = true
    },
    hideSpinner: function () {
      this.isShowSpinner = false
    },
    get: function (id) {
      console.log('get: ' + id)
      this.clearFlash()
      // console.log('get')
      // console.log(this.$store.getters.user)
      // console.log(this.$store.getters.token)
      const params = { id: id, access_token: this.$store.getters.token }
      var self = this
      console.log('get: 2')
      this.model.get(params, function (errors, response) {
        console.log('get: 3')
        console.log(errors)
        console.log(response)
        if (errors) {
          console.log('get: 4')
          console.log(errors)
          self.errors = errors
        } else {
          console.log('get: 5')
          console.log(response)
        }
        self.models = self.model.records
      })
    },
    edit: function (id) {
      console.log('edit')
      console.log(id)
      console.log(this.model.name)
      this.$router.push({ name: 'admin_operations_users_edit' })
    },
    trash: function (id) {
      console.log('delete')
      console.log(id)
      console.log(this.model.name)
    }
  }

}

</script>
