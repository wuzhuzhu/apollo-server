import {property} from 'lodash';
import DB  from '../../../lib/collections'

export const schema = `
  type Stats {
    patientTotalCount: Int
    measurePatientCount: Int
    invitationCount: Int
  }
`;

export const resolvers = {
  Stats: {
    patientTotalCount  : ({patientTotalCount}) => patientTotalCount,
    measurePatientCount: ({measurePatientCount}) => measurePatientCount,
    invitationCount: ({invitationCount}) => invitationCount
  }
};