import { merge } from 'lodash';
import DB from '../../lib/collections'

import { schema as userSchema, resolvers as userResolver } from './user/schema';
import { schema as authorSchema, resolvers as authorResolver } from './author/schema';
import { schema as statsSchema, resolvers as statsResolver } from './stats/schema';
import { schema as feedbackSchema, resolvers as feedbackResolver } from './feedback/schema';

const rootSchema = `
   type RootQuery {
    author(name: String): Author
    user: User
    getStats: Stats
    
    allUsers: [User]
    oneFeedback(feedbackId: String!): Feedback
    allFeedbacks: [Feedback]
   }
   
   type RootMutation {
    changeFeedbackText(feedbackId: String!, text: String!): Feedback
  }
   
   schema {
    query: RootQuery
    mutation: RootMutation
  }
  
  
`

/*recentDistinctPostIds =  function() {
 var rawMeasures = DB.Posts.rawCollection();
 var aggregateQuery = Meteor.wrapAsync(rawPosts.aggregate, rawPosts);
 return aggregateQuery([{
 $group: {
 _id: '$thread',
 date: {$max: '$date'},
 postId: {$first: '$_id'}
 }},
 {$sort: {date: -1}},
 {$limit: 5},
 ]);
 }*/

export const rootResolvers = {
  RootQuery: {
    allUsers(root, args, context) {
      return Meteor.users.find().fetch()
    },
    async user(root, args, context) {
      // Only return the current user, for security
      // console.log(context)
      if (context.user) {
        // if (context.userId === args.id) {
        return await Meteor.users.findOne(context.user._id);
      } else return await Meteor.users.findOne({_id: 'hqm3QJtRDkkqhPmbK'});
    },
    getStats(root, args, context) {
      const patientTotalCount = Meteor.users.find({roles:"patient"}).count();
      const measurePatientCount = DB.MeasureBP.distinct('patientId').length
      const invitationCount = DB.Invite.find().count()
      return {
        patientTotalCount,
        measurePatientCount,
        invitationCount
      }
    },
    oneFeedback(root, {feedbackId}, context) {
      const feedback = DB.Feedback.findOne({_id: feedbackId})
      return feedback
    },
    allFeedbacks(root, args, context) {
      const allFeedbacks = DB.Feedback.find({pateintId: {$exists: 1}}).fetch()
      return allFeedbacks
    },
    author(root, args) {
      return { id: 1, name: 'Hello23'};
    },
  },

  RootMutation: {
    changeFeedbackText(root, {feedbackId, text}, context) {
      DB.Feedback.update(feedbackId, {$set:{text: text}})
      return DB.Feedback.findOne(feedbackId)
    }
  }
};

export const typeDefs = [rootSchema, userSchema, authorSchema, statsSchema, feedbackSchema];
export const resolvers = merge(rootResolvers, userResolver, authorResolver, statsResolver, feedbackResolver);