import { Mongo } from 'meteor/mongo';

export const Documents = new Mongo.Collection('documents');
Documents.attachSchema({
  createdAt: {
    type: Date,
    index: 1,
    autoform: {
      type: "datetime"
    },
    autoValue() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  name: {
    type: String,
    defaultValue: 'document-name'
  },
  text: {
<<<<<<< HEAD
    type: Strng,
=======
    type: String,
>>>>>>> stash-branch
    defaultValue: 'Here goes your text'
  }
});
