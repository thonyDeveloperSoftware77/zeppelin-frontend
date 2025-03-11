import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <Link to="/student/dashboard">Ir al Dashboard</Link>
    </div>
  );
};

export default Home;
