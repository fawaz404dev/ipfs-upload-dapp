import React from 'react';
import styles from './header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <div className={styles.brand}>
        <a href="/" className={styles.link}>
          IPFS File Upload Dapp
        </a>
      </div>
    </nav>
  </div>
);

export default Header;
