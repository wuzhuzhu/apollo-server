

import DB  from '../../lib/collections'

export default function () {
  Meteor.methods({
    'Users.create': function(username, email, password) {

      check(username, String);
      check(email, String);
      check(password, String);

      return Accounts.createUser({username: username, email: email, password: password});
    }
  });




  Meteor.methods({
    'stat.measure': function() {


      let patientCount = Meteor.users.find({'roles':'patient'}).count()

      let now= +new Date()
      let latest7Start = new Date(now- 3600*24*7*1000)

      let patientMeasure = DB.MeasureBP
                            .find({'createdAt':{$gte:latest7Start}},{fields:{'patientId':1}})
                            .fetch()

      let patientMeasureCount = patientMeasure.map(function(item){
        return item.patientId
      })
      //console.log(patientMeasureCount)
      patientMeasureCount = _.uniq(patientMeasureCount).length


      console.log(patientCount,patientMeasureCount)

      //return DB.MeasureBP.find({},{limit:10}).fetch()//.limit(10)

      return {
        username: "testname",
        patientCount:patientCount,
        patientMeasureCount:patientMeasureCount
      }

    }
  });

  Meteor.methods({
    'stat.invite': function() {
      let now= +new Date()
      let latest7Start = new Date(now- 3600*24*7*1000)

      let invites = DB.Invite.find({
        'isActive':true,
        //'createdAt':{$gte:latest7Start}
      }).fetch()

      let doctorIds = invites.map(function(item){
        return item.doctorId
      })
      doctorIds = _.uniq(doctorIds)

      let docMap={}
      invites.forEach(function(item){
        if(docMap[item.doctorId]){
          docMap[item.doctorId]++
        }else {
          docMap[item.doctorId]=1
        }

      })


      let items = doctorIds.map(function(doctorId){
        return {
          doctorId:doctorId,
          inviteCount:docMap[doctorId]
        }
      })
      items.sort(function(a,b){
        return -a.inviteCount+b.inviteCount
      })


      console.log(items)

      return items

    }
  });

}
