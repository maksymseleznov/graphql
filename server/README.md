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


{
  getEvents(skip: 2, limit: 1) {
    id
    name
    createdBy {
      id
      lastName
    }
    users {
      id
      lastName
    }
  }
}