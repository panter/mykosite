import { Mongo } from 'meteor/mongo';


if (Meteor.isClient) {
  Meteor.subscribe('userData');
}

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    tokens: 1,
  }});
});

Meteor.methods({
  'user.addToken'(token) {
     Meteor.users.update({ _id: this.userId }, { $addToSet: { tokens: token }});
   },
})
