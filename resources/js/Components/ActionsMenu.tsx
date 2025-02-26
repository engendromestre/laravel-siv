import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';

type ActionsMenuProps = {
    rowId: string | number;
    onView: (id: string | number) => void;
    onEdit: (id: string | number) => void;
    onDelete: (id: string | number) => void;
};

export function ActionsMenu({
    rowId,
    onView,
    onEdit,
    onDelete,
}: ActionsMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => onView(rowId)}>
                    <VisibilityIcon sx={{ mr: 1 }} /> Visualizar
                </MenuItem>
                <MenuItem onClick={() => onEdit(rowId)}>
                    <EditIcon sx={{ mr: 1 }} /> Editar
                </MenuItem>
                <MenuItem onClick={() => onDelete(rowId)}>
                    <DeleteIcon sx={{ mr: 1 }} /> Apagar
                </MenuItem>
            </Menu>
        </Box>
    );
}
