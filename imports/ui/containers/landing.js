import React from 'react';
import {composeWithTracker} from 'react-komposer'
import {LinearProgress, RaisedButton, FlatButton, Card, CardText, CardActions} from 'material-ui';
import Formsy from 'formsy-react'
import {FormsyText} from 'formsy-material-ui/lib';
import { Documents } from '/imports/api/Documents.js'
import Quill from '/imports/ui/components/quill.jsx'

var loadingVar = new ReactiveVar(true);
const getName = function () {
  var keys = _.keys(FlowRouter.current().queryParams);
  return _.reject(keys, (key) => key === 'uuid')[0];
}

const setName = function (name) {
  FlowRouter.setQueryParams({ [name]: '' })
}

var name = undefined;
var setNameReally = _.debounce(function () {
  setName(name);
}, 500)

var setNameDebounced =  function (newName) {
  name = newName
  loadingVar.set(true)
  FlowRouter.setQueryParams({ [getName()]: null })
  Session.set({documentName: null}) 
  setNameReally();
}

var progress = function (loading) {
  if (loading) return <LinearProgress /> 
}

const edit = (document) => {
  if (document) {
    Quill.helpers.editDocument(document);
  } else {
    var id = Meteor.call('document.insert', {name: getName()});
    FlowRouter.setQueryParams({uuid: id})
  }
}

const Landing = ({document, loading}) =>  {

  if (Documents.helpers.isEditing(document)) {
    return <div></div>;

  } else {
    return (
      <div>
        <Card className="landing section">
          <CardText>
            <Formsy.Form onValidSubmit={edit.bind(this, document)}>
              <FormsyText name='keyword' className='keyword' value={getName(document)} floatingLabelText="Page"
                          onChange={(e) => setNameDebounced(e.target.value)} autocomplete='off'/>
              <FlatButton type="submit" label={document ? 'Edit' : 'Create'} />
            </Formsy.Form>
          </CardText>
        </Card>
        {progress(loading)}
      </div>);
  }
};

var handle;

function composer (props, onData) {
  var name = getName();
  handle = Subs.subscribe('documentsByName', name);
  var document;
  if (handle.ready()) {
    document = Documents.findOne({ name: name });
    if (document) {
      Session.set({ documentName: document.name })
    } else {
      Session.set({ documentName: null })
    }
    if (name == getName()) {
      loadingVar.set(false)
    }
  }

  onData(null, {document, loading: loadingVar.get() });

}

export default composeWithTracker(composer)(Landing);
