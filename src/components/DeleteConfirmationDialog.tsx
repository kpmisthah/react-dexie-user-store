import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { WarningAmberRounded as WarningIcon } from "@mui/icons-material";

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationDialog({
    open,
    onClose,
    onConfirm,
}: DeleteConfirmationDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1,
                    background: "rgba(15, 23, 42, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                },
            }}
        >
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WarningIcon color="error" />
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: "text.secondary" }}>
                    Are you sure you want to permanently remove this user? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit" variant="text">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    autoFocus
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
