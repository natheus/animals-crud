import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(values);
  const registerAnimal = () => {
    Axios.post("http://localhost:3001/register", {
      nome: values.nome,
      raca: values.raca,
      detalhes: values.detalhes,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        nome: values.nome,
        raca: values.raca,
        detalhes: values.detalhes,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            nome: values.nome,
            raca: values.raca,
            detalhes: values.detalhes,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Animais</h1>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Raça"
          name="raca"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Detalhes"
          name="detalhes"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={registerAnimal} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          nome={val.nome}
          raca={val.raca}
          detalhes={val.detalhes}
        />
      ))}
    </div>
  );
}
