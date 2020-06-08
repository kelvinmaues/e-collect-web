import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
// api
import api from "../../services/api";
// components
import Header from "../../components/Header";
// assets
import "./style.css";

// array or object: Manually inform the variable type with TypeScript
interface Material {
  id: number;
  name: string;
  image_url: string;
}

interface State {
  value: number;
  label: string;
}

interface IBGEStateResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreateStation = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [initialCoords, setInitialCoords] = useState<[number, number]>([0, 0]);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    street: "",
    neighborhood: "",
    zipcode: "",
    complement: "",
  });

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialCoords([latitude, longitude]);
    });
  }, []);

  const getMaterials = async () => {
    api
      .get("materials")
      .then((res) => {
        const { data = null } = res;
        if (data) {
          setMaterials(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMaterials();
  }, []);

  useEffect(() => {
    axios
      .get<IBGEStateResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((res) => {
        const { data = null } = res;
        if (data) {
          const mapped = data.map((el) => el.sigla);
          setStates(mapped);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleState = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
      )
      .then((res) => {
        const { data = null } = res;
        if (data) {
          const mapped = data.map((el) => el.nome);
          setCities(mapped);
        }
      })
      .catch((err) => console.log(err));
  }, [selectedState]);

  const handleCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setSelectedCoords([lat, lng]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectedMaterials = (id: number) => {
    const alreadySelected = selectedMaterials.findIndex((el) => el === id);
    if (alreadySelected >= 0) {
      const filteredMaterials = selectedMaterials.filter((el) => el !== id);
      setSelectedMaterials(filteredMaterials);
    } else {
      setSelectedMaterials([id, ...selectedMaterials]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const {
      name,
      email,
      whatsapp,
      street,
      neighborhood,
      zipcode,
      complement,
    } = formData;
    const state = selectedState;
    const city = selectedCity;
    const [latitude, longitude] = selectedCoords;
    const materials = selectedMaterials;

    const data = {
      name,
      email,
      whatsapp,
      street,
      neighborhood,
      zipcode,
      complement,
      state,
      city,
      latitude,
      longitude,
      materials,
    };

    try {
      await api.post("stations", data);
    } catch (error) {
      console.log(error);
    } finally {
      alert("Ponto de coleta criado!");
      history.push("/");
    }
  };

  return (
    <div id="page-create-station">
      <Header>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>
      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro de <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialCoords} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedCoords}>
              <Popup>
                Você está aqui. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="state">Estado</label>
              <select
                name="state"
                id="state"
                value={selectedState}
                onChange={handleState}
              >
                <option value="0">Selecione um estado</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="street">Rua</label>
              <input
                type="text"
                name="street"
                id="street"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="neighborhood">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                id="neighborhood"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="zipcode">CEP</label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="complement">Complemento</label>
              <input
                type="text"
                name="complement"
                id="complement"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Materiais de coleta</h2>
            <span>Selecione um ou mais materiais abaixo</span>
          </legend>

          <ul className="items-grid">
            {materials.map((material) => (
              <li
                key={`${material.id}`}
                onClick={() => handleSelectedMaterials(material.id)}
                className={
                  selectedMaterials.includes(material.id) ? "selected" : ""
                }
                style={{
                  cursor: "pointer",
                }}
              >
                <img src={material.image_url} alt={material.name} />
                <span>{material.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button
          type="submit"
          style={{
            cursor: "pointer",
          }}
        >
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  );
};

export default CreateStation;
