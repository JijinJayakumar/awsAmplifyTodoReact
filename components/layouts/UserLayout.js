import HeaderNav from "./HeaderNav";
function UserLayout({ children }) {
  return (
    <div>
      <HeaderNav />
      <div className="container" style={{ maxWidth: "500px",margin: "auto"}}>{children}</div>
    </div>
  );
}
export default UserLayout;

