const NavBar = () => {
  return (
    <>
      <nav className="bg-slate-900 text-white ">
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
          <div className="logo font-bold text-white text-2xl">
            <span className="text-green-500"> &lt;</span>

            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </div>

          <button className="ring-white ring-1 text-white  my-4 rounded-full flex gap-4 justify-center items-center">
            <img className="invert w-10  p-1" src="/icons/github.svg" alt="" />
            <span className="font-bold px-2 ">GitHub</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
