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
    defaultValue: '<div style="zoom: 111%;"><div><span style="font-size: 32px;">Congratulations!</span></div><div><br></div><div><span style="font-size: 18px;">You just created your own web page in the internet. The whole document is already published with the URL above. You can share it with your friends and will be updated in real time, as soon as you hit the save button.</span></div><div><br></div><div><span style="font-size: 18px;">The text you are currently reading is the default text of every page created here. You can safely remove the content and replace it with your own.</span></div><div><br></div><div><span style="font-size: 18px;">This page offers you a whole new experience on how you publish your content</span></div><ul><li><span style="font-size: 18px;">Easy</span></li><li><span style="font-size: 18px;">Fast</span></li><li><span style="font-size: 18px;">And Free!</span></li></ul><div><br></div><div><span style="font-size: 32px;">Have fun!</span></div></div>'
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
