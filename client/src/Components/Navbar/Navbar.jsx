import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { UserContext } from '../../App';

import { DrawerComp } from '../Drawer/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 100;

export const NavBarComp = () => {
	const { login, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.setItem('LoggedIn', JSON.stringify(false));
		localStorage.setItem('UserEmail', JSON.stringify(''));
		window.location.reload();
		setTimeout(() => {
			navigate('/');
		}, 500);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				color="transparent"
				elevation={0}
				position="sticky"
				sx={{
					width: login ? `calc(100% - ${drawerWidth}px)` : '100%',

					ml: login ? `${drawerWidth}px` : 0,
					textAlign: 'center',
					boxShadow: 'rgba(0,0,0,0.2) 0px 5px 15px'
				}}
			>
				<Toolbar>
					<Typography variant="h5" sx={{ marginLeft: login ? '560px' : '630px', fontWeight: 'bold' }}>
						TASK MANAGER APP
					</Typography>
					{login ? (
						<React.Fragment>
							<PersonIcon
								sx={{ marginLeft: 'auto', cursor: 'pointer' }}
								onClick={() => navigate('/profile')}
							/>
							<Typography
								variant="body1"
								sx={{ marginLeft: '20px', marginRight: '20px', fontWeight: 'bold' }}
							>
								{userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1)}
							</Typography>
							<Button sx={{ color: 'black' }} onClick={handleLogout}>
								<LogoutIcon />
							</Button>
						</React.Fragment>
					) : null}
				</Toolbar>
			</AppBar>
			{login && <DrawerComp />}
		</Box>
	);
};
