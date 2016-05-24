import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Documents = new Mongo.Collection('documents');
Documents.attachSchema({
  name: {
    type: String,
    unique: true
  },
  token: {
    type: String,
    unique: true,
    autoValue: Meteor.uuid
  },
  text: {
    type: String,
    defaultValue: '<div> <span style="font-size: 18px;">Welcome to your μPage</span> </div> <div> <br> </div> <div> <span style="font-size: 14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut nisi massa. Cras malesuada commodo dolor in ultricies. Morbi tempor enim sed dolor vulputate iaculis. Curabitur volutpat, ipsum eget suscipit laoreet, neque odio fringilla erat, in mattis est felis vel metus. Morbi lacinia tellus ac varius maximus. Proin id dolor elit. Nulla</span> </div>'
  },
  saved: {
    type: Boolean,
    defaultValue: false
  }
});

global.Documents = Documents;


if (Meteor.isServer) {
  Meteor.publish("documentsByName", (name) => {
    return Documents.find({name: name});
  });
}


Meteor.methods({
  'document.insert'(doc) {
    check(doc, Object);
    doc.userId = this.userId
    return Documents.insert(doc);
   },
  'document.update'(doc) {
    check(doc, Object);

    Documents.update(doc._id, { $set: { text: doc.text, saved: true }});
  },

  'document.remove'(doc) {
    check(doc, Object);

    Documents.remove({_id: doc._id});
  }
});
