import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
// components
import Header from "../../components/Header";
// assets
import "./style.css";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <Header />
        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>
          <Link to="/create-station">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
