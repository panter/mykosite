import { Mongo } from 'meteor/mongo';

export const Documents = new Mongo.Collection('documents');
Documents.attachSchema({
  name: {
    type: String,
    defaultValue: 'document-name'
  },
  text: {
    type: String,
    defaultValue: 'Here goes your text'
  }
});
