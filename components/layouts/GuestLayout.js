import HeaderNav from "./HeaderNav";

function GuestLayout({ children }) {
  return (
    <div>
      <HeaderNav />
      <div className="container">{children}</div>
    </div>
  );
}
export default GuestLayout;
