import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Loader } from './styles';

function Loading({
	small,
	getUserDetails,
}) {

  useEffect(() => {
  	// getUserDetails();
  })
  return (
    <Loader small={small}>
	    <svg className="loading-spinner__circle-svg" viewBox="25 25 50 50">
	      <circle className="loading-spinner__circle-stroke" cx="50" cy="50" r="20" fill="none" stroke="#DC3E15" strokeWidth="2" strokeMiterlimit="10" />
	    </svg>
	  </Loader>
  );
}


Loading.propTypes = {
  small: PropTypes.bool,
};

Loading.defaultProps = {
  small: false,
};


export default compose()(Loading);
