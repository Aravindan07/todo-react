import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from '../../containers/SignIn/saga';
import reducer from '../../containers/SignIn/reducer';
import LogoIcon from '../../assets/images/logo.svg';
import Search from '../../assets/images/search.svg';
import Balloon from '../../assets/images/balloon.svg';
import Task from '../../assets/images/task.svg';
import Notification from '../../assets/images/bell.svg';
import Profilepic from '../../assets/images/profilepic.svg';
import { ReactSVG } from 'react-svg';
import FlipMove from 'react-flip-move';
import {
  Bar,
  LogoDiv,
  IconsWrapper,
  IconElement,
  ProfileWrapper,
  ProfileDetails,
  ProfileTitle,
  Element,
  Logout,
} from './styles';
import {
  getUserDetails,
  logout,
} from '../../containers/SignIn/actions';
import {
  selectUserDetails,
} from '../../containers/SignIn/selector';
 
const key = 'signin';
function VerticalBar({
  logout,
  getUserProfile,
}) {
  const node = useRef();
  const [ active, setActive ] = useState('Task'); 
  const [ element, setElement ] = useState([
    { name: 'Task', icon: Task, link: '/' },
    { name: 'Search', icon: Search, link: '/search' },
    { name: 'Notification', icon: Notification, link: '/notification' }
  ]);
  const [ dropdown, setDropdown ] = useState(false);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    document.addEventListener("click", showDropDown);
    return () => {
      document.removeEventListener("click", showDropDown);
    };
    if(location.pathname.indexOf('notification') >= 0) {
      setActive('Notification');
    } else if(location.pathname.indexOf('search') >= 0) {
      setActive('Search');
    } else {
      setActive('Task');
    }
  });

  const showDropDown = e => {
    if (node.current.contains(e.target)) {
      setDropdown(true);
      return;
    }
    setDropdown(false);    
  };

  const Navigation = ((event) => {
    const activeElem = event.target.closest(".SwitchHeaderContent").getAttribute("active_elem");
    setActive(activeElem);
  });

  const Profile = () => {
    return (
      <React.Fragment>
      <ProfileWrapper  ref={node} onClick={showDropDown} >
        <ReactSVG src={Profilepic} />
      </ProfileWrapper>

      {dropdown &&
        <FlipMove
          staggerDurationBy="200"
          staggerDelayBy="20"
          duration={100}
          appearAnimation="accordionHorizontal"
          enterAnimation="fade"
          leaveAnimation="fade"
        >
          <ProfileDetails>
            <ProfileTitle>{getUserProfile.name}</ProfileTitle>
            <Element>Profile</Element>
            <Element>Settings</Element>
            <Logout onClick={logout}>Logout</Logout>
          </ProfileDetails>
        </FlipMove>
      }
      </React.Fragment>
    );
  };

  return (
    <Bar>
      <IconsWrapper>
        {element.map((item) => (
          <IconElement key={item.name}>
            <NavLink
              className='SwitchHeaderContent'
              onClick={Navigation}
              active_elem={item.name}
              to={`${item.link}`}
            >
              <ReactSVG src={`${item.icon}`} />
            </NavLink>
          </IconElement>
        ))}
      </IconsWrapper>
      {Profile()}
    </Bar>
  );
}


VerticalBar.propTypes = {
  getUserProfile: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getUserProfile: selectUserDetails(),
});

export function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(VerticalBar);