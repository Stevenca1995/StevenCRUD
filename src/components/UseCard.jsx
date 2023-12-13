import { IconArrowsMinimize } from "@tabler/icons-react";

const UseCard = ({
  showModalUser,
  onCloseModal,
  register,
  handleSubmit,
  createUser,
  editUser,
  isUdating,
  errors,
}) => {
  const submit = (currenUser) => {
    isUdating ? editUser(currenUser) : createUser(currenUser);
  };

  const titleModal = isUdating ? "Editar usuario" : "Nuevo usuario";
  const buttonModal = isUdating ? "Guardar cambios" : "Agregar nuevo usuario";

  return (
    <section
      className={`fixed bg-black/60 top-0 right-0 left-0 h-screen transition-all flex justify-center items-center ${
        showModalUser ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="grid gap-4 bg-white p-4 rounded-md relative w-[min(100%,_280px)] sm:w-96"
      >
        <h5 className="font-bold text-lg sm:text-xl"> {`${titleModal}`} </h5>
        <button
          onClick={onCloseModal}
          type="button"
          className="absolute top-5 right-5 hover:text-red-500 transition-colors"
        >
          <IconArrowsMinimize size={20} />
        </button>
        <label className="grid gap-1">
          <span className="text-sm font-semibold">
            Nombre <span className="text-red-500">*</span>
          </span>
          <input
            className="bg-[#F9FAFC] border rounded-md p-1 outline-none"
            type="text"
            {...register("first_name", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: {
                value: 3,
                message: "Escribe minimo 3 caracteres"
              },
              maxLength: {
                value: 20,
                message: "Escribe maximo 20 caracteres"
              }
            })}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">
              {errors.first_name.message}
            </span>
          )}
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold">
            Apellidos <span className="text-red-500">*</span>
          </span>
          <input
            className="bg-[#F9FAFC] border rounded-md p-1 outline-none"
            type="text"
            {...register("last_name", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: {
                value: 3,
                message: "Escribe minimo 3 caracteres"
              },
              maxLength: {
                value: 20,
                message: "Escribe maximo 20 caracteres"
              }
            })}
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">
              {errors.first_name.message}
            </span>
          )}
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold">
            Correo <span className="text-red-500">*</span>
          </span>
          <input
            className="bg-[#F9FAFC] border rounded-md p-1 outline-none"
            type="email"
            {...register("email", {
              pattern: {
                value: /^(([^<>()/[\]\\.,;:\s@”]+(\.[^<>()/[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                message: "El correo no es valido"
              }
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold">
            Contraseña <span className="text-red-500">*</span>
          </span>
          <input
            className="bg-[#F9FAFC] border rounded-md p-1 outline-none"
            type="password"
            {...register("password", {
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}$/,
                message: "Mínimo 6 caracteres, al menos una letra mayúscula, una letra minúscula, un número y caracter especial"
              }
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold">Cumpleaños</span>
          <input
            className="bg-[#F9FAFC] border rounded-md p-1 outline-none"
            type="date"
            {...register("birthday")}
          />
        </label>
        <button
          type="submit"
          className="bg-[#555A88] text-white font-semibold p-2 rounded-md hover:bg-[#767bb9] transition-all "
        >
          {`${buttonModal}`}
        </button>
      </form>
    </section>
  );
};
export default UseCard;
