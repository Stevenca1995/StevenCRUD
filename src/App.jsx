import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseCard from "./components/UseCard";
import UserList from "./components/UserList";


const BASE_URL = "https://users-crud.academlo.tech";

function App() {
  const [showModalUser, setShowModalUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //? Abrir modal
  const hadleOpenModal = () => {
    setShowModalUser(true);
  };

  //? Cerrar modal
  const handleCloseModal = () => {
    setShowModalUser(false);
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
    });
    setUserToEdit(null);
  };

  const handleUpdateUser = (user) => {
    hadleOpenModal();
    setUserToEdit(user);
  };

  //? Crea un nuevo usuasrio
  const createUser = (newUser) => {
    axios
      .post(BASE_URL + "/users/", newUser)
      .then(({ data: newUser }) => {
        setUsers([...users, newUser]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  //? Elimina un usario por su id
  const deleteUser = (idUserDelete) => {
    Swal.fire({
      width: 300,
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(BASE_URL + `/users/${idUserDelete}/`)
          .then(() => {
            const newUsers = users.filter((user) => user.id !== idUserDelete);
            setUsers(newUsers);
          })
          .catch((err) => console.log(err));
        Swal.fire({
          width: 300,
          text: `El Usuario ha sido eliminado.`,
          icon: "success",
        });
      }
    });
  };

  //? Editar un usuario por su id
  const editUser = (user) => {
    axios
      .put(BASE_URL + `/users/${userToEdit.id}/`, user)
      .then(({ data: updateUser }) => {
        const newUser = users.map((user) =>
          user.id === userToEdit.id ? updateUser : user
        );
        setUsers(newUser);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/users/")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userToEdit) {
      reset(userToEdit);
    }
  }, [userToEdit]);

  return (
    <main className="py-8 px-5 sm:py-12 sm:px-20">
      <header className="flex justify-between">
        <h5 className="font-bold text-2xl text-[#12123a] sm:text-4xl">
          Usuarios
        </h5>
        <button
          className="flex gap-1 bg-[#555A88] p-2 text-white text-sm rounded-md sm:text-base"
          onClick={hadleOpenModal}
        >
          <IconPlus size={20} />
          Crear nuevo usuario
        </button>
      </header>
      <UseCard
        showModalUser={showModalUser}
        onCloseModal={handleCloseModal}
        register={register}
        handleSubmit={handleSubmit}
        createUser={createUser}
        editUser={editUser}
        isUdating={!!userToEdit}
        errors={errors}
      />
      <UserList
        users={users}
        deleteUser={deleteUser}
        handleUpdateUser={handleUpdateUser}
      />
    </main>
  );
}

export default App;
