function AppBar() {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex items-center ml-4 h-full">PayTm</div>
      <div className="flex">
        <div className="flex items-center mr-4 h-full">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex items-center h-full  text-xl">U</div>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
