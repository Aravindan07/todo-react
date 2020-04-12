import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { 
	HeaderWrapper,
	ElementWrapper,
	HeaderElement,
} from './styles';

function Header() {
	const [ active, setActive ] = useState('Dashboard');
	const [ element, setElement ] = useState([
		{
			name: 'Dashboard',
			link: '/',
		},
		{
			name: 'Analytics',
			link: '/analytics'
		}
	]);
	
	useEffect(() => {
		if(location.pathname.indexOf('analytics') >= 0) {
			setActive('Analytics');
		} else {
			setActive('Dashboard');
		}
	});

	const Navigation = ((event) => {
		const activeElem = event.target.closest(".SwitchHeaderContent").getAttribute("active_elem");
		setActive(activeElem);
	});

	return (
		<HeaderWrapper>
			<ElementWrapper>
				{element.map((item) => (
					<HeaderElement key={item.name}>
						<NavLink
							onClick={Navigation}
							className={
								active === `${item.name}` ? 
								'SwitchHeaderContent activeHeader' : 
								'SwitchHeaderContent'
							}
							active_elem={item.name}
							to={`${item.link}`}
						>
							{item.name}
						</NavLink>

					</HeaderElement>
				))}
			</ElementWrapper>		
		</HeaderWrapper>
	);
}

export default Header;