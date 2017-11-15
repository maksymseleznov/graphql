// https://github.com/sayden/graphql-mongodb-example/blob/master/Models/User/UserSchema.es6

import { mongodb, websocket } from '../services';

import { getProjection } from '../utils';

const { Schema } = mongodb;

export const { ObjectId } = Schema;

const EventSchema = new Schema({
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  date: {
    type: Date,
    default: Date.now
  }
},{
  // collection : 'Event'
})

class Event {
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

  // `getEvents()` becomes a static
  static getEvents (parent, { query = {}, skip = null, limit = null }, { Models }, info) {

    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        // if (parent.users) {
        //   query._id = { $in: parent.users };
        // }
      }

      console.log('getEvents', parent, query);

      Models.Events.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEvent (parent, { id }, { Models }, info) {

    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      console.log('getEvent', parent, id);

      Models.Events.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static createEvent (parent, { input }, { Models }, info) {
    return new Promise((resolve, reject) => {
      Models.Events.create(input)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static updateEvent (parent, { id, input }, { Models }, info) {
    return new Promise((resolve, reject) => {
      Models.Events.findByIdAndUpdate(id, input, { new: true, upsert: false, multi: false })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static deleteEvent (parent, { id }, { Models }, info) {
    return new Promise((resolve, reject) => {
      Models.Events.remove({ _id: ObjectId(id) })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EventSchema.loadClass(Event);

EventSchema.set('toJSON', { getters: true });

export default mongodb.model('Event', EventSchema)
