import {property} from 'lodash';
import DB  from '../../../lib/collections'
import { schema as Patient } from '../patient/schema'
/*

export const schema = `
  type Feedback {
    _id: String
    patient: User
    opinion: String
    reply: String
  }
`;

export const resolvers = {
  Feedback: {
    _id  : ({_id}) => _id,
    patient: ({patient}) => patient,
    opinion: ({opinion}) => opinion,
    reply: ({reply}) => reply,
  }
};*/


export const schema = `
  type Feedback {
    _id: String
    patient: User
    opinion: String
    reply: String
    text: String
  }
`;

export const resolvers = {
  Feedback: {
    _id  : ({_id}) => _id,
    // patient: ({pateintId}) => pateintId,
    patient: ({pateintId}) => {
      return Meteor.users.findOne({_id:pateintId})
    },
    opinion: ({opinion}) => opinion,
    reply: ({reply}) => reply,
    text: ({text}) => text || "Text not set.",
  }
};