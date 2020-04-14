import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ReactSVG } from 'react-svg';
import FlipMove from 'react-flip-move';

import Close from '../../assets/images/close.svg';
import injectReducer from '../../utils/injectReducer';
import { selectFlashMessage } from './selectors';
import reducer from './reducers';
import { OverallWrapper, Wrapper, CloseIcon } from './styles';

class FlashMessage extends React.PureComponent {
  constructor (props) {
    super (props);
    this.state = {
      messages: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const messages = [...this.state.messages];
    messages.push(nextProps.messages);
    this.setState({ messages });
    setTimeout(() => {
      const timedOut = [...this.state.messages];
      timedOut.shift();
      this.setState({ messages: timedOut });
    }, 4000);
  }

  close = (index) => {
    const messages = [...this.state.messages];
    messages.splice(index, 1);
    this.setState({ messages });
  }

  render () {
    return (
      <OverallWrapper messageLength={this.state.messages.length}>
        <FlipMove
          staggerDurationBy="200"
          staggerDelayBy="20"
          duration={300}
          appearAnimation="accordionVertical"
          enterAnimation="accordionVertical"
          leaveAnimation={{
            from: {
              transform: '',
            },
            to: {
              transform: 'translateX(-100%)',
              opacity: 0,
            }
          }}
        >
        {this.state.messages.map((message, index) =>
          (<Wrapper key={index} type={message.messageType}>
            {message.text}
            <CloseIcon onClick={() => this.close(index)}><ReactSVG src={Close} /></CloseIcon>
          </Wrapper>)
        )}
        </FlipMove>
      </OverallWrapper>
    );
  } 
}

FlashMessage.propTypes = {
  messages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

FlashMessage.defaultProps = {
  messages: {},
};

const mapStateToProps = createStructuredSelector({
  messages: selectFlashMessage(),
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'flashmessage', reducer });

export default compose(
  withReducer,
  withConnect,
)(FlashMessage);
