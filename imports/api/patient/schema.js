import {property} from 'lodash';
import DB from '../../../lib/collections'

export const schema = `
  type Patient {
    _id: String
    username: String
  }
`;

export const resolvers = {
  Patient: {
    _id  : ({_id}) => _id,
    username: ({username}) => username,
  }
};