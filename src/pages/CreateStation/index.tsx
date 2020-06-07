import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
// components
import Header from "../../components/Header";

// assets
import "./style.css";
const CreateStation = () => {
  return (
    <div id="page-create-station">
      <Header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>
      <form>
        <h1>
          Cadastro de <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-23.6431282, -46.660879]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-23.6431282, -46.660879]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="state">Estado</label>
              <select name="state" id="state">
                <option value="0">Selecione um estado</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="street">Rua</label>
              <input type="text" name="street" id="street" />
            </div>
            <div className="field">
              <label htmlFor="neighborhood">Bairro</label>
              <input type="text" name="neighborhood" id="neighborhood" />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="zipcode">CEP</label>
              <input type="text" name="zipcode" id="zipcode" />
            </div>
            <div className="field">
              <label htmlFor="complement">Complemento</label>
              <input type="text" name="complement" id="complement" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Materiais de coleta</h2>
            <span>Selecione um ou mais materiais abaixo</span>
          </legend>

          <ul className="items-grid">
            <li className="selected">
              <img
                src="http://localhost:3333/uploads/pilhas_baterias.svg"
                alt="pilhas e baterias"
              />
              <span>Pilhas e Baterias</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/pilhas_baterias.svg"
                alt="pilhas e baterias"
              />
              <span>Pilhas e Baterias</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/pilhas_baterias.svg"
                alt="pilhas e baterias"
              />
              <span>Pilhas e Baterias</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/pilhas_baterias.svg"
                alt="pilhas e baterias"
              />
              <span>Pilhas e Baterias</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/pilhas_baterias.svg"
                alt="pilhas e baterias"
              />
              <span>Pilhas e Baterias</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/pilhas_baterias.svg"
                alt="pilhas e baterias"
              />
              <span>Pilhas e Baterias</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreateStation;
