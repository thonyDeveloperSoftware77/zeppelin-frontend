import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <Link to="/admin/dashboard">Ir al Dashboard</Link>
    </div>
  );
};

export default Home;
