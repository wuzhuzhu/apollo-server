import { Random } from 'meteor/random';

export const schema = `
  type Email {
    address: String
    verified: Boolean
  }
  
  type User {
    emails: [Email]
    username: String
    randomString: String
  }
`;

export const resolvers = {
  User: {
    username: ({username}) => username,
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  }
};