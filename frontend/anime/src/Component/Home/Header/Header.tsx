import React from 'react';
import styles from './styles.module.scss';
import HeaderNavigation from './HeaderNavigation';
import HeaderInput from './HeaderInput';
import HeaderButton from './HeaderButton';
import { useMediaQuery } from 'react-responsive';
const Header = () => {
  const isSmallScreen = useMediaQuery({ query: '(min-width: 767px)' });
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>AnimePro</h1>
        {isSmallScreen ? <HeaderNavigation /> : <h1>qwe</h1>}
        <HeaderInput />
        <div className={styles.header_button_container}>
          <HeaderButton
            placeholderText="Log In"
            width="85px"
            backgroundColor="black"
            textColor="white"
          />

          <HeaderButton
            placeholderText={'Get started'}
            backgroundColor={'white'}
            width={'114px'}
            textColor={'black'}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
