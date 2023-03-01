import { Drawer, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Toolbar } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import TaskIcon from '@mui/icons-material/Task';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export const DrawerComp = () => {
	const pathRoute = window.location.href.split('/')[3];
	const [ currentSelection, setcurrentSelection ] = useState(pathRoute);
	const navigate = useNavigate();
	const { login } = useContext(UserContext);

	useEffect(() => {
		if (!login) {
			navigate('/');
		}
	}, []);

	useEffect(
		() => {
			setcurrentSelection(pathRoute);
		},
		[ window.location.href ]
	);

	return (
		<Drawer
			PaperProps={{
				sx: {
					backgroundColor: '#003566'
				}
			}}
			anchor="left"
			variant="permanent"
		>
			<Toolbar sx={{ height: '70px' }} />
			<Divider />
			<List>
				<ListItem key={'Tasks'} disablePadding>
					<ListItemButton
						onClick={() => {
							navigate('/tasks');
							setcurrentSelection('tasks');
						}}
						sx={{ backgroundColor: `${currentSelection === 'tasks' ? '#0a243a' : null}` }}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<TaskIcon />
						</ListItemIcon>
						<ListItemText sx={{ color: 'white' }} primary={'Tasks'} />
					</ListItemButton>
				</ListItem>
				<ListItem key={'EventList'} disablePadding>
					<ListItemButton
						onClick={() => {
							navigate('/eventlist');
							setcurrentSelection('eventlist');
						}}
						sx={{ backgroundColor: `${currentSelection === 'eventlist' ? '#0a243a' : null}` }}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<EventIcon />
						</ListItemIcon>
						<ListItemText sx={{ color: 'white' }} primary={'EventList'} />
					</ListItemButton>
				</ListItem>
				<ListItem key={'Calendar'} disablePadding>
					<ListItemButton
						onClick={() => {
							navigate('/calendar');
							setcurrentSelection('calendar');
						}}
						sx={{ backgroundColor: `${currentSelection === 'calendar' ? '#0a243a' : null}` }}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<CalendarMonthIcon />
						</ListItemIcon>
						<ListItemText sx={{ color: 'white' }} primary={'Calendar'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};
