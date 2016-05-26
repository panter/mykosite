import React from 'react';
import {Tabs, Tab, FlatButton, TextField, Paper, RaisedButton} from 'material-ui';
import { FacebookCount } from "react-social";
// see https://github.com/olahol/react-social
import { FacebookButton, TwitterButton, GooglePlusButton, PinterestButton, LinkedInButton, RedditButton, VKontakteButton, EmailButton, XingButton, TumblrButton} from "react-social"
// see http://markhuge.github.io/svg-social-icons/
import icons from 'svg-social-icons' 
import Badge from 'material-ui/Badge';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import { Documents } from '/imports/api/Documents.js';

const editLink = function (document) {
  var path = '?' + document.name + '&token=' + document.token;
  return window.location.host + path;
  return <a href={path}>{window.location.host}{path}</a>;
}

const viewLink = function (document) {
    var path = '/' + document.name;
    return window.location.host + path;
    return <a href={path}>{window.location.host}{path}</a>;
}

var shareLinks = (document) => (
  <Paper className="share-links section">
    <Tabs>
      <Tab label="Share view link" >
        <div>
          <TextField id="view-link" floatingLabelText="Share link" value={viewLink(document)} style={{width: '400px'}}/>
          <FlatButton className="clipboard" data-clipboard-target="#view-link" icon={<CopyIcon/>}/>
        </div>
    </Tab>
    <Tab label="Share edit link" >
        <div>
            <h2>!! EVERYBODY WHO HAS THIS LINK CAN EDIT AND DELETE THE DOCUMENT !!</h2>
            <p>
           <TextField id="edit-link" floatingLabelText="Edit link" value={editLink(document)} style={{width: '400px'}} />
           <FlatButton className="clipboard" data-clipboard-target="#edit-link" icon={<CopyIcon/>}/>
            </p>
        </div>
      </Tab>
    </Tabs>
  </Paper>
)  

var shareButtons = (document) => (
  <div className="share-buttons section">
          <FacebookButton>
              <div dangerouslySetInnerHTML={{__html: icons('facebook')}}/>
          </FacebookButton>
          <TwitterButton>
              <div dangerouslySetInnerHTML={{__html: icons('twitter')}}/>
          </TwitterButton>
          <GooglePlusButton>
              <div dangerouslySetInnerHTML={{__html: icons('google')}}/>
          </GooglePlusButton>
          <PinterestButton>
              <div dangerouslySetInnerHTML={{__html: icons('pinterest')}}/>
          </PinterestButton>
          <LinkedInButton>
              <div dangerouslySetInnerHTML={{__html: icons('linkedin')}}/>
          </LinkedInButton>
          {/**<RedditButton>
              <div dangerouslySetInnerHTML={{__html: icons('reddit')}}/>
          </RedditButton> **/}
          <EmailButton>
              <div dangerouslySetInnerHTML={{__html: icons('email')}}/>
          </EmailButton>
          {/**<<XingButton>
              <div dangerouslySetInnerHTML={{__html: icons('xing')}}/>
          </XingButton> **/}
          <TumblrButton>
              <div dangerouslySetInnerHTML={{__html: icons('tumblr')}}/>
          </TumblrButton>
  </div>
)


//const Links = ({document}) => {
const Links = ({document}) => {
  return {
    componentDidMount() {
      new Clipboard(".clipboard");
    },

  render() {
  if (!document || Documents.helpers.isEditing(document)) {
    return <div></div>
  }
  return (
    <div>
      {shareButtons(document)}
      {shareLinks(document)}
    </div>)
    }
    }
}

export default Links
