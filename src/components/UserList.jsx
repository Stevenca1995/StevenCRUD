import { IconGift, IconPencil, IconTrash } from "@tabler/icons-react";

const UserList = ({ users, deleteUser, handleUpdateUser }) => {

  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10 sm:py-12">
      {users.map((user) => (
        <article
          key={user.id}
          className="grid gap-2 border-2 rounded-md px-4 py-2"
        >
          <h2 className="font-bold">
            {" "}
            {user.first_name} {user.last_name}{" "}
          </h2>
          <hr className="bg-[#E5E5E5]" />
          <ul className="grid gap-1">
            <li className="grid gap-1">
              {" "}
              <span className="text-[#D3D3D3]">CORREO</span> {user.email}{" "}
            </li>
            <li className="grid gap-1">
              {" "}
              <span className="text-[#D3D3D3] ">CUMPLEAÑOS</span>
              <div className="flex gap-1">
                <IconGift size={22} /> {user.birthday}{" "}
              </div>
            </li>
          </ul>
          <hr className="bg-[#E5E5E5]" />
          <div className="flex gap-1 justify-end ">
            <button onClick={() => deleteUser(user.id)}>
              <IconTrash
                className="bg-[#D93F3F] p-1 text-white rounded-md"
                size={30}
              />
            </button>
            <button onClick={() => handleUpdateUser(user)}>
              <IconPencil
                className="border-2 border-slate-400/50 p-1 text-[#797777] rounded-md"
                size={30}
              />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};
export default UserList;
