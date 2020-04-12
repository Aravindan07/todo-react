import React from 'react';
import { ReactSVG } from 'react-svg';
import EmptyTaskIcon from '../../assets/images/emptytask.svg';
import EmptyAnalyticsIcon from '../../assets/images/emptyanalytics.svg';
import { 
  EmptyCardDetails 
} from './styles';

function EmptyMessage(props) {
  return (
    <EmptyCardDetails>
      {props.type === 'empty' && 
        <React.Fragment>
          <ReactSVG src={EmptyTaskIcon} />
          <div className='emptyText'>No tasks to display. Create one Now!</div>
        </React.Fragment>
      }
      {props.type === 'analytics' && 
        <React.Fragment>
          <ReactSVG src={EmptyAnalyticsIcon} />
          <div className='emptyText'>We are working tirelessly to get this feature for you!</div>
        </React.Fragment>
      }
      {props.type === 'notification' && 
        <React.Fragment>
          <ReactSVG src={EmptyTaskIcon} />
          <div className='emptyText'>We are working tirelessly to get this feature for you!</div>
        </React.Fragment>
      }
    </EmptyCardDetails>
  );
}

export default EmptyMessage;
