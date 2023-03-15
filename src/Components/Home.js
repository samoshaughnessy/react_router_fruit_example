import { useContext } from "react";
import { UserContext } from "../App";

export default function Home() {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>Welcome to our humble and family friendly fruit store</h1>
      <h3>Check out the links above to navigate through our application </h3>
      <h3>{user ? <p>Welcome {user.email}</p> : <p>No user logged in.</p>}</h3>
    </div>
  );
}
