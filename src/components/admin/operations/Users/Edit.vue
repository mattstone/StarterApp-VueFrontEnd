<template>
  <div>
    <h2 class="text-capitalize">Edit
      <span v-if= "this.model !== null">
        {{this.model.singular()}}
      </span>
    </h2>
    <hr>

    <template>
      <Flash :info='info' :success='success' :warning='warning' :error='error' :errors='errors' />
    </template>

    <template v-if="model === null">
      <p>... loading model ...</p>
    </template>

    <template v-else>
      <form @submit.prevent="update" class="form">
        <fieldset :key="componentKey">
          <div class="form-group row">
            <div class="col-sm-2 col-form-label">
              <label class="control-label" for="Email">Email</label>
            </div>
            <div class="col-sm-8">
              <input class="form-control" v-model="model.model.email" type="email" placeholder="email address" aria-label="Email" readonly>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-form-label">
              <label class="control-label" for="Created at">Created at</label>
            </div>
            <div class="col-sm-8">
              <input class="form-control" v-model="model.model.created_at" type="text" aria-label="Created at" readonly>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-form-label">
              <label class="control-label" for="Updated at">Updated at</label>
            </div>
            <div class="col-sm-8">
              <input class="form-control" v-model="model.model.updated_at" type="text" aria-label="Updated at" readonly>
            </div>
          </div>

          <hr>

          <div class="row">
            <div class="col-sm-2">
              <button v-on:click="update()" type="button" class="btn btn-primary">
                Update
              </button>
            </div>
            <div class="col-sm-1">
              <template v-if="isShowSpinner">
                <div class="spinner-border text-primary"></div>
              </template>
            </div>
          </div>
          <hr>
        </fieldset>
      </form>
    </template>


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
      componentKey: 0,
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

    if (this.$props.id === null || this.$props.id === undefined) {
      this.$router.push({name: 'admin_operations_users'})
    } else {
      this.show(this.$props.id)
    }
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
    show: function (id) {
      this.clearFlash()
      const params = { id: id, access_token: this.$store.getters.token }
      var self = this
      this.model.show(params, function (errors, response) {
        if (errors && errors.length !== 0) {
          self.errors = errors
        }
        self.componentKey += 1
      })
    },
    update: function (id) {
      const params = { access_token: this.$store.getters.token }
      this.model.update(params, function (errors, response) {
        if (errors && errors.length !== 0) {
          self.errors = errors
        }
        self.componentKey += 1
      })
    }
  }

}

</script>
