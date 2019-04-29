<template>
<div>
  <div class="row">
    <div class="col-md-11">
      <h2 class="text-capitalize">{{this.model.name}}</h2>
    </div>
    <div class="col-md-1">
      <i class="fas fa-plus-square text-primary"></i>
    </div>
  </div>

  <template>
    <Flash :info='info' :success='success' :warning='warning' :error='error' :errors='errors' />
  </template>

  <div class="row">
    <table class="table">
    <thead>
      <th scope="col">Email</th>
      <th scope="col">Created</th>
      <th scope="col">Updated</th>
      <th scope="col">Actions</th>
    </thead>
    <tbody>
      <template v-if="models.length === 0">
        <tr>
          <td colspan="4">There are no users</td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="model in models">
          <td>{{model.email}}</td>
          <td>{{model.created_at | moment("Do MMMM YYYY") }}</td>
          <td>{{model.updated_at | moment("Do MMMM YYYY") }}</td>
          <td>
            <div>
              <button v-on:click="edit(model.id)" type="button" class="btn btn-primary">
                <i class="fas fa-edit"></i>
              </button>
              <button  v-on:click="trash(model.id)" type="button" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>
      </template>

    </tbody>
    </table>
  </div>
</div>
</template>

<script>

import Flash from '../../../includes/Flash'
import User from '../../../../../models/User.js'

// import axios from 'axios'

export default {
  name: 'AdminUsers',
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
    this.get()
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
    get: function () {
      this.clearFlash()
      // console.log('get')
      // console.log(this.$store.getters.user)
      // console.log(this.$store.getters.token)
      const params = { access_token: this.$store.getters.token }
      var self = this
      this.model.get(params, function (errors, response) {
        if (errors) {
          self.errors = errors
        } else {

        }
        self.models = self.model.records
      })
    },
    edit: function (id) {
      console.log('edit')
      console.log(id)
      this.$router.push({name: 'admin_operations_users_edit', params: { id: id }})
    },
    trash: function (id) {
      console.log('delete')
      console.log(id)
      console.log(this.model.name)
    }
  }

}

</script>
