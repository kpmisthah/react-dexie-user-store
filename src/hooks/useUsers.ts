import { useState, useEffect, useCallback } from "react";
import { db } from "../db";
import { type User } from "../interface/user.interface";
import { fetchUsers } from "../api";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);
            const localUsers = await db.users.toArray();

            if (localUsers.length > 0) {
                setUsers(localUsers);
            } else {
                const apiUsers = await fetchUsers();
                await db.users.bulkAdd(apiUsers);
                setUsers(apiUsers);
            }
        } catch (error) {
            console.error("Failed to load users:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshUsers = useCallback(async () => {
        try {
            setLoading(true);
            await db.users.clear();
            const apiUsers = await fetchUsers();
            await db.users.bulkAdd(apiUsers);
            setUsers(apiUsers);
        } catch (error) {
            console.error("Failed to refresh users:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteUser = useCallback(async (id: string) => {
        try {
            await db.users.delete(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleDeleteClick = (id: string) => {
        setDeleteConfirmationId(id);
    };

    const handleConfirmDelete = () => {
        if (deleteConfirmationId) {
            deleteUser(deleteConfirmationId);
            setDeleteConfirmationId(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationId(null);
    };


    return {
        users,
        loading,
        refreshUsers,
        deleteUser,
        handleCancelDelete,
        handleConfirmDelete,
        handleDeleteClick,
        deleteConfirmationId
    };
};
