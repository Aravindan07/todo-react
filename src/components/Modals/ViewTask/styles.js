import styled from 'styled-components';
import {
	TaskName,
	TaskDesc,
	ExpiryTag,
	ActionWrapper,
	StatusTag,
} from '../../TaskCard/styles';

export const Name = styled(TaskName)``;

export const Description = styled(TaskDesc)`
	height: 104px;
`;

export const CreatedBy = styled(StatusTag)``;

export const Expiry = styled(ExpiryTag)`
	bottom: 0;
	margin-top: 20px;
`;