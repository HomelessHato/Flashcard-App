import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function CreateCards() {
  const history = useHistory();
  const params = useParams();
  const deckId = params.deckId;
  
  
  const initialFormState = {
    front: "",
    back: "",
    
  };
const [form, setForm] = useState(initialFormState);
  


  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(form)
    async function fetchCard() {
      const response = await createCard(deckId, form);
      setForm(response);
    }
    fetchCard();
    history.push(`/decks/${deckId}`);
  };
  const handleDone = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <CardForm
        form = {form}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDone={handleDone}
        title={"Add"}
      />
    </div>
  );
}