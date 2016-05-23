import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Documents = new Mongo.Collection('documents');
Documents.attachSchema({
  name: {
    type: String,
    defaultValue: 'document-name',
    unique: true
  },
  text: {
    type: String,
    defaultValue: '<div> <span style="font-size: 18px;">Welcome to your μPage</span> </div> <div> <br> </div> <div> <span style="font-size: 14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut nisi massa. Cras malesuada commodo dolor in ultricies. Morbi tempor enim sed dolor vulputate iaculis. Curabitur volutpat, ipsum eget suscipit laoreet, neque odio fringilla erat, in mattis est felis vel metus. Morbi lacinia tellus ac varius maximus. Proin id dolor elit. Nulla</span> </div>'
  }
});

global.Documents = Documents;


if (Meteor.isServer) {
  Meteor.methods({findOrCreateDocument: (name) => {
    var doc = Documents.findOne({name});
    return (doc && doc._id) || Documents.insert({});
  }});

  Meteor.publish("documents", (id) => {
    return Documents.find({_id: id});
  });
}


Meteor.methods({
  'document.update'(doc) {
    check(doc, Object);

    Documents.update(doc._id, { $set: { text: doc.text } });
  }
});
