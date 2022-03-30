import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";
import { Trash, Pencil } from "react-bootstrap-icons";
export default function Card({id, front, back, deckId}){
  const { url } = useRouteMatch();
  const history = useHistory();

  const handleDelete = (event) => {
    event.preventDefault();
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      deleteCard(id);
      history.go(0);
    }
  };
    return (
      <div className="list-group-item">
        <div>
        <p className="text-wrap">{front}</p>
        <p className="text-right">{back}</p>
        </div>
        <div className="d-flex justify-content-end">
        <Link to = {`${url}/cards/${id}/edit`} className="btn btn-secondary mr-2"><Pencil /> Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">
          <Trash />
        </button>
        </div>
      </div>
    );
}