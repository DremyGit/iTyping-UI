import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './Header.scss';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropmenuOpen: false,
    };
  }

  componentDidMount() {
    // this.props.getUserInfo();
    this.cancel = window.addEventListener('click', (e) => {
      if (!this.state.dropmenuOpen || e.target === this.link) {
        return;
      }
      this.setState({ dropmenuOpen: false });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.cancel);
  }

  getDropMenu() {
    const { dropmenuOpen } = this.state;
    if (!dropmenuOpen) {
      return null;
    }
    return (
      <ul className={styles.dropmenu}>
        <li><Link to="/exercise/english">英文词组</Link></li>
        <li><Link to="/exercise/chinese">中文词组</Link></li>
        <li className="line" />
        <li><a>用户信息</a></li>
      </ul>
    );
  }

  render() {
    const { userInfo } = this.props;
    return (
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.logo}>iTyping</Link>
          <div className={styles.user}>
            <a
              ref={(link) => { this.link = link; }}
              onClick={() => this.setState({ dropmenuOpen: !this.state.dropmenuOpen })}
            >
              { userInfo.nick_name || '加载中' } <span className="caret" />
            </a>
            {this.getDropMenu()}
          </div>
        </div>
      </header>
    );
  }
}

/* eslint-disable no-unused-vars */
function mapStateToProps(state) {
  return {
    // userInfo: state.user.info,
    userInfo: { nick_name: 'test' },
  };
}

export default connect(mapStateToProps)(Header);
