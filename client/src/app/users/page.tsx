"use client";
import { useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface User {
  userId: string;
  name: string;
  email: string;
}

const Users = () => {
  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center h-full">
          <GridActionsCellItem
            className="!bg-blue-300 !hover:bg-blue-500 py-2 px-4"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setSelectedUser(params.row as User);
              setIsEditModalOpen(true);
            }}
          />
          <GridActionsCellItem
            className="!bg-red-300 !hover:bg-red-500 py-2 px-4"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              setSelectedUser(params.row as User);
              setIsDeleteModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: users, isError, isLoading, refetch } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleCreateUser = async (userData: { userId: string; name: string; email: string }) => {
    try {
      await createUser(userData);
      refetch();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = async (userData: { name: string; email: string }) => {
    if (selectedUser) {
      await updateUser({
        userId: selectedUser.userId,
        userData,
      });
      console.log(selectedUser);
      refetch();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    refetch();
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return <div className="text-center text-red-500 py-4">Failed to fetch users</div>;
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Add User
      </button>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="column-bg bg-blue shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
      {/* Create User Modal */}
      <AddUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />
      {/* Edit User Modal */}
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onEdit={handleEditUser}
        />
      )}
      {/* Delete User Modal */}
      {selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => selectedUser && handleDeleteUser(selectedUser.userId)}
          userName={selectedUser.name}
        />
      )}
    </div>
  );
};

export default Users;
