import React from 'react';
import Header from './Header';
import styles from './MainLayout.css';
import './global.scss';

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className="container">
        {children}
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: React.PropTypes.node,
};

export default MainLayout;
