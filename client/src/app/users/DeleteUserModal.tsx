import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  userName: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onDelete, userName }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete user &quot;{userName}&quot;?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="primary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;

