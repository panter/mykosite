import React from 'react';
import {Paper} from 'material-ui';
import { FacebookCount } from "react-social";
// see https://github.com/olahol/react-social
import { FacebookButton, TwitterButton, GooglePlusButton, PinterestButton, LinkedInButton, RedditButton, VKontakteButton, EmailButton, XingButton, TumblrButton} from "react-social"
// see http://markhuge.github.io/svg-social-icons/
import icons from 'svg-social-icons' 

const link = function (document, editable) {
  var path = '?' + document.name
  if (editable) {
    path += '&uuid=' + document._id
  }

  return <a href={path}>{window.location.host}{path}</a>;
}

const Links = ({document}) => {
  if (!document) {
    return <div></div>
  }
  return (<Paper className="links section">
      <span>
        View link: &nbsp; {link(document, false)}
      </span>
      &nbsp; &nbsp; &nbsp;
      <span>
        Edit link: &nbsp; {link(document, true)}
      </span>
      <br/>
      <span className="share-buttons">
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
  </Paper>)
}

export default Links
