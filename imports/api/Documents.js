import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Documents = new Mongo.Collection('documents');
Documents.attachSchema({
  name: {
    type: String,
    unique: true
  },
  userId: {
    type: String
  },
  editing: {
    type: String,
    optional: true
  },
  watchingCount: {
    type: Number,
    defaultValue: 0
  },
  visitorsCount: {
    type: Number,
    defaultValue: 0
  },
  token: {
    type: String,
    unique: true
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
Documents.helpers = {
  canEdit(document) {
    if (!document) return false;
    var user = Meteor.user();
    if (!user) return false;
    return document.userId == user._id || _.include(user.tokens, document.token);
  },

  isEditing(document) {
    if (!document) return false;
    var user = Meteor.user();
    if (!user) return false;
    return document.editing === user._id;
  }
}

global.Documents = Documents;

if (Meteor.isServer) {
  Documents.update({}, { $set: { watchingCount: 0 } }, { multi: true });

  Meteor.publish("documentsByName", function (name) {
    var docs = Documents.find({name: name});
    var doc = Documents.findOne({name: name})
    this.onStop(() => {
      if (doc) Documents.update({ _id: doc._id}, { $inc: { watchingCount: -1 }})
    })
    if (doc) Documents.update({ _id: doc._id},
                              { $inc: { watchingCount: 1, visitorsCount: 1 }})
    return docs;
  });
}

Meteor.methods({
  'document.insert'(doc) {
    check(doc, Object);
    doc.userId = this.userId
    doc.token = Meteor.uuid();
    return Documents.insert(doc);
   },
  'document.update'(doc) {
    check(doc, Object);

    var current = Documents.findOne({_id: doc._id});
    if (!current) throw new Error('Document not found:' + JSON.stringify(doc._id));

    if (!Documents.helpers.canEdit(current)) {
      throw new Error('Access Denied');
    }

    Documents.update(doc._id, { $set: { text: doc.text, saved: true, editing: doc.editing }});
  },

  'document.remove'(doc) {
    check(doc, Object);

    Documents.remove({_id: doc._id});
  }
});
