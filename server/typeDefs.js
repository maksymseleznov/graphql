export default `

  scalar Date

  type Event {
    id: ID!
    createdBy: User!
    name: String!
    users: [User]
    date: Date
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    date: Date
  }

  input UserQueryInput {
    firstName: String
    lastName: String
  }

  input EventQueryInput {
    createdBy: ID
    name: String
  }

  type Query {

    getUsers(query: UserQueryInput, skip: Int, limit: Int): [User!]!
    getUser(id: ID!): User

    getEvents(query: EventQueryInput, skip: Int, limit: Int): [Event!]!
    getEvent(id: ID!): Event

  }

  input UserInput {
    firstName: String!
    lastName: String!
    date: Date
  }

  input EventInput {
    createdBy: ID!
    name: String!
    users: [ID]
    date: Date
  }

  type Mutation {

    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): Boolean!

    createEvent(input: EventInput): Event
    updateEvent(id: ID!, input: EventInput): Event
    deleteEvent(id: ID!): Boolean!

  }
  
  type Subscription {
    userCreated(firstName: String!): User
  }
  
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
