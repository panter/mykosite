import React from 'react';
import {Tabs, Tab, IconButton, FlatButton, TextField, Paper, RaisedButton} from 'material-ui';
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
}

const viewLink = function (document) {
    var path = '/' + document.name;
    return window.location.host + path;
}
var shareLink = (document) => (
  <Paper className='share-link section'>
    <TextField id="view-link" floatingLabelText="Share link" value={viewLink(document)} style={{width: '400px'}}/>
    <IconButton className="clipboard" data-clipboard-target="#view-link"><CopyIcon/></IconButton>
  </Paper>
)
var editLink2 = (document) => (
  <Paper className="share-links section">
        <div>
            <h2>!! EVERYBODY WHO HAS THIS LINK CAN EDIT AND DELETE THE DOCUMENT !!</h2>
            <p>
           <TextField id="edit-link" floatingLabelText="Edit link" value={editLink(document)} style={{width: '400px'}} />
           <FlatButton className="clipboard" data-clipboard-target="#edit-link" icon={<CopyIcon/>}/>
            </p>
        </div>
  </Paper>
)  

var shareButtons = (document) => (
  <span className="share-buttons section">
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
  </span>
)


//const Links = ({document}) => {
const Links = () => {
  return {
    componentDidMount() {
      new Clipboard(".clipboard");
    },

  render(args) {
    var document = this.props.document;
    var name = this.props.name;
    if (!document || Documents.helpers.isEditing(document)) {
      return <div></div>
    }
    return (
      <div className="footer">
        {shareLink(document)}
        {shareButtons(document)}
      </div>)
   }
   }
}

export default Links
