
export const typeDefs = `#graphql

type Website {
  id: ID!
  domain: String!
  name: String!
  province: String!
  city: String!
  stars: Int!
  grantDate: String!
  expiryDate: String!
  trustSealUrl: String!
}

type Query {
    websites(
    city : String
    province : String
    stars: Int
  ): [Website!]!
}
`;