import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.nome}
        detalhes={props.detalhes}
        raca={props.raca}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">{props.nome}</h1>
        <p className="card-id">{props.id}</p>
        <h2 className="card-cartegory">{props.detalhes}</h2>
        <h3 className="card-cost">{props.raca}</h3>
      </div>
    </>
  );
}
