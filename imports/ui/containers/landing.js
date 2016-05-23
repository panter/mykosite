import React from 'react';
import {composeWithTracker} from 'react-komposer'
import {RaisedButton, Card, CardText, CardActions} from 'material-ui';
import Formsy from 'formsy-react'
import {FormsyText} from 'formsy-material-ui/lib';

var name = new ReactiveVar()

const Landing = ({document}) =>  {
  return (<Card className="landing">
    <CardText>
      <Formsy.Form>
        <FormsyText name='keyword' floatingLabelText="Keyword" onChange={(e) => name.set(e.target.value)}/>
        <RaisedButton type="submit" label="Submit" disabled={!document}/>
      </Formsy.Form>
    </CardText>
  </Card>)
}

function composer (props, onData) {
  const handle = Meteor.subscribe('documentsByName', name.get());
  if (handle.ready()) {
    console.log(name)
    const document = Documents.findOne({ name: name.get() });
    onData(null, {document});
  }
};

export default composeWithTracker(composer)(Landing);
