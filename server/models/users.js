// https://github.com/sayden/graphql-mongodb-example/blob/master/Models/User/UserSchema.es6

import { mongodb, websocket } from '../services';

import { getProjection } from '../utils';

const { Schema } = mongodb;

export const { ObjectId } = Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},{
  // collection : 'User'
})

class User {
  // `fullName` becomes a virtual
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(v) {
    const firstSpace = v.indexOf(' ');
    this.firstName = v.split(' ')[0];
    this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
  }

  // `getFullName()` becomes a document method
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // `getUsers()` becomes a static
  static getUsers (parent, { query = {}, skip = null, limit = null }, { Models }, info) {

    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent.users) {
          query._id = { $in: parent.users };
        }
      }

      console.log('getUsers', parent, query);

      Models.Users.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getUser (parent, { id }, { Models }, info) {

    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent.createdBy) {
          id = parent.createdBy;
        }
      }

      console.log('getUser', parent, id);

      Models.Users.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static createUser (parent, { input }, { Models }, info) {
    return new Promise((resolve, reject) => {
      Models.Users.create(input)
        .then(data => {
          websocket.publish('createdUser', { createdUser: data });
          resolve({
            ok: true,
            user: data,
            errors:[]
          })
        })
        .catch(error => {
          reject({
            ok: false,
            user: null,
            errors:[error]
          })
        })
    })
  }

  static updateUser (parent, { id, input }, { Models }, info) {
    return new Promise((resolve, reject) => {
      Models.Users.findByIdAndUpdate(id, input, { new: true, upsert: false, multi: false })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static deleteUser (parent, { id }, { Models }, info) {
    return new Promise((resolve, reject) => {
      Models.Users.remove({ _id: ObjectId(id) })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static subscribe () {
    return websocket.asyncIterator('createdUser')
  }

  // subscribe: withFilter(
  //   () => websocket.asyncIterator('createdUser'),
  //   (payload, variables) => {
  //     console.log(payload, variables);
  //     return true;
  //   }
  // ),
}

UserSchema.loadClass(User);

UserSchema.set('toJSON', { getters: true });

export default mongodb.model('User', UserSchema)
