
# {
#   getUser(id:"5a02603639cbb22a325e561a"){
#     id
#   }
# }

# {
#   getUsers {
#     id
#     firstName
#   }
# }

# mutation {
#   createEvent(
#     input: {
#       name: "new event3",
#       createdBy: "5a02603639cbb22a325e561a"
#     }
#   ) {
#     id
#     name
#   }
# }

# {
#   getEvents(skip: 2, limit: 1) {
#     id
#     name
#     createdBy {
#       id
#       lastName
#     }
#     users {
#       id
#       lastName
#     }
#   }
# }


subscription {
  createdUser {
    id
    firstName
  }
}

mutation {
  createUser (
    input: {
     	firstName: "Max",
      lastName: "Seleznov",
      date: "11/14/2017"
    }
  ) {
    ok
    user {
      id
      firstName
    }
  }
}
