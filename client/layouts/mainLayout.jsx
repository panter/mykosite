import React from 'react';

export const MainLayout = ({header, content, footer}) => (
  <div>
    <div className="navigation">
      {header}
    </div>
    <div className="content container">
      {content}
    </div>
    <div className="footer">
      {footer}
    </div>
  </div>
);
