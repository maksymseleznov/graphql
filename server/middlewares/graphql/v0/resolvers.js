import { withFilter } from 'graphql-subscriptions';
import { GraphQLScalarType } from 'graphql';

import { websocket } from '../../../services';
import { Users, Events } from '../../../models';

export default {

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      // console.log("parseValue", value);
      // Implement your own behavior here by setting the 'result' variable
      return new Date(value); // value from the client
    },
    serialize (value) {
      // console.log("serialize", value);
      // Implement your own behavior here by setting the 'result' variable
      return value.getTime(); // value sent to the client
    },
    parseLiteral (ast) {
      // console.log("parseLiteral", ast);

      let value;

      switch (ast.kind) {
        // Implement your own behavior here by returning what suits your needs
        // depending on ast.kind
        case 'StringValue':
          value = new Date(ast.value);
          break;
        default:
          value = null;
      }

      return value;
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

  Subscription: {
    createdUser: {
      // resolve: (payload, args, context, info) => {
      //   // Manipulate and return the new value
      //   // console.log("resolve createdUser", payload, args, context, info)
      //   return payload;
      // },
      subscribe: Users.subscribe,
    },
  }
}
