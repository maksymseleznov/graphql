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

  type Error {
    path: String!
    message: String
  }

  type ResponseEvent {
    ok: Boolean!
    event: Event
    errors: [Error!] 
  }

  type ResponseUser {
    ok: Boolean!
    user: User
    errors: [Error!] 
  }

  type Mutation {

    createUser(input: UserInput): ResponseUser!
    updateUser(id: ID!, input: UserInput): ResponseUser!
    deleteUser(id: ID!): ResponseUser!

    createEvent(input: EventInput): ResponseEvent!
    updateEvent(id: ID!, input: EventInput): ResponseEvent!
    deleteEvent(id: ID!): ResponseEvent!

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
