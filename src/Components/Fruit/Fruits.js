import { Outlet } from "react-router-dom";

export default function Fruits() {
  return (
    <div>
      <h1>Fruits</h1>
      <p>See which page is rendered below</p>
      <Outlet />
    </div>
  );
}
