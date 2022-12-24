import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


export default function ExerciseDrawer(props) {
    const ex_id = props.exercise.ex_id;
    const index = props.exercise.index;
    const name = props.exercise.name;
    const sets = props.exercise.sets;
    const [open, setOpen] = useState(true);
  
    const handleClick = () => {
      setOpen(!open);
    };

return (
<List>
    <ListItemButton onClick={handleClick}>
    <ListItemText primary={name} />
    {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
            </ListItemButton>
        </List>
    </Collapse>
</List>
);
}