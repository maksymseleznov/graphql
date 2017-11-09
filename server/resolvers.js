
import { GraphQLScalarType } from 'graphql';

import { Users, Events } from './models';

export default {

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      console.log("parseValue", parseValue);
      return new Date(value); // value from the client
    },
    serialize(value) {
      console.log("serialize", value);
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      console.log(parseLiteral, ast);
      return ast;
    },
  }),

  Event: {
    createdBy: Users.getUser,
    users: Users.getUsers,
  },

  Query: {

    getUsers: Users.getUsers,
    getUser: Users.getUser,

    getEvents: Events.getEvents,
    getEvent: Events.getEvent,

  },

  Mutation: {

    createUser: Users.createUser,
    updateUser: Users.updateUser,
    deleteUser: Users.deleteUser,

    createEvent: Events.createEvent,
    updateEvent: Events.updateEvent,
    deleteEvent: Events.deleteEvent,

  },
}
