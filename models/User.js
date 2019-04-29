const Base = require('./Base.js');

class User extends Base {
  constructor(user) {
    super('/users', 'users')

    this.permissionLevels = {
      USER: 1,
      SUBSCRIBER: 2,
      ADMIN: 2000,
    }

    if (user !== null && user !== undefined) { this.setModel(user) }
  }

  setModel(user) {
    // this.model.__v = user.__v
    // this.model._id = user._id
    this.model.id  = user.id
    this.model.email = user.email
    this.model.permission = user.permission
    this.model.isSuspended = user.isSuspended
    this.model.confirmed = user.confirmed
    this.model.created_at = user.created_at
    this.model.updated_at = user.updated_at
  }

  permissionLevel() {
    // for
  }

  isAdmin() {
    return this.permission == 2000
  }
}

module.exports = User;
