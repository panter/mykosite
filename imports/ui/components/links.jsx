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

const viewLink = function (document) {
    var path = '/' + document.name;
    return window.location.host + path;
}

var shareButtons = (document) => (
  <div>
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

          <IconButton className="clipboard" data-clipboard-target="#view-link"><CopyIcon/></IconButton>
      </span>
          <input type="text" id="view-link" value={viewLink(document)} style={{position: 'absolute', left: '0px', top: '-400px'}} />

  </div>
)


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
        {shareButtons(document)}
      </div>)
   }
   }
}

export default Links
