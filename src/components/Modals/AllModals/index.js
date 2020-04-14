import React, {useEffect, memo} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../utils/injectReducer';

import CreateTask from '../CreateTask';
import ViewTask from '../ViewTask';
import EditTask from '../EditTask';
import DeleteTask from '../DeleteTask';
import SignUp from '../SignUp';
import './styles.css';
import Close from '../../../assets/images/close.svg';
import { selectIsOpen, selectModalType, selectModalData } from './selectors';
import { closeModal } from './actions';
import reducer from './reducer';

const key = 'modals';

const smallModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#F5F8FD',
    width: '100%',
    maxWidth: '375px',
    height: '150px',
    padding: '25px 20px',
    position: 'relative',
    border: '8px solid #0a749f',
    borderRadius: '20px',
  },
};

const semiModal = {
  content: {
    background: '#F5F8FD',
    maxWidth: '380px',
    height: '300px',
    margin: 'auto',
    padding: '25px 50px',
    position: 'absolute',
    border: '8px solid #0a749f',
    borderRadius: '20px',
  },
};

const mediumModal = {
  content: {
    background: '#F5F8FD',
    maxWidth: '440px',
    maxHeight: '500px',
    margin: 'auto',
    padding: '25px 50px',
    position: 'absolute',
    border: '8px solid #0a749f',
    borderRadius: '20px',
  },
};

const ModalList = {
  createTask: CreateTask,
  viewTask: ViewTask,
  editTask: EditTask,
  deleteTask: DeleteTask,
  signUp: SignUp,
};

const ModalType = {
  createTask: mediumModal,
  viewTask: semiModal,
  editTask: mediumModal,
  deleteTask: smallModal,
  signUp: mediumModal,
};

export function AllModal({
  isOpen,
  modalType,
  data,
  close,
}) {
  
  useInjectReducer({ key, reducer });

  useEffect(() => {
    Modal.setAppElement('body');
  });

  const ModalToShow = ModalList[modalType];

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        style={ModalType[modalType]}
        contentLabel="Modal"
        overlayClassName="Overlay"
      >
        {isOpen &&
          <div>
              <div className="closeButton" onClick={close}>
              <ReactSVG src={Close} />
            </div>
            <ModalToShow
              data={data}
            />
          </div>}
      </Modal>
  );
}

AllModal.propTypes = {
  isOpen: PropTypes.bool,
  modalType: PropTypes.string,
  data: PropTypes.object,
  close: PropTypes.func.isRequired,
};

AllModal.defaultProps = {
  isOpen: false,
  modalType: '',
  data: {},
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpen(),
  modalType: selectModalType(),
  data: selectModalData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(closeModal()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(AllModal);
