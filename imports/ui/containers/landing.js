import React from 'react';
import {composeWithTracker} from 'react-komposer'
import {RaisedButton, Card, CardText, CardActions} from 'material-ui';
import Formsy from 'formsy-react'
import {FormsyText} from 'formsy-material-ui/lib';
import { Documents } from '/imports/api/Documents.js'

const getName = function () {
  var keys = _.keys(FlowRouter.current().queryParams);
  return _.reject(keys, (key) => key === 'uuid')[0];
}

const setName = function (name) {
  FlowRouter.setQueryParams({ [getName()]: null })
  FlowRouter.setQueryParams({ [name]: '' })
}

const Landing = ({document}) =>  {
  const create = function () {
    
    var id = Documents.insert({name: getName()});
    Session.set({documentId: id}) 
  }

  $('.keyword input').attr('autocomplete', 'off')

  return (<Card className="landing section">
    <CardText>
      <Formsy.Form onValidSubmit={create}>
        <FormsyText name='keyword' className='keyword' value={getName()} floatingLabelText="Keyword" onChange={(e) => setName(e.target.value)} autocomplete='off'/>
        <RaisedButton type="submit" label="Create New Page..." disabled={document}/>
  
      </Formsy.Form>
    </CardText>
  </Card>)
}

function composer (props, onData) {
  FlowRouter.watchPathChange()
  const handle = Meteor.subscribe('documentsByName', getName());
  if (handle.ready()) {
    const document = Documents.findOne({ name: getName() });
    if (document) {
      Session.set({ documentId: document._id })
    } else {
      Session.set({ documentId: null })
    }
    onData(null, {document});
  }

};

export default composeWithTracker(composer)(Landing);
