import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";


export default function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };

  const [form, setForm] = useState({});

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function fetchDeck() {
      const response = await createDeck(form);
      setForm({ initialFormState });
      history.push(`/decks/${response.id}`);
    }
    fetchDeck();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
      <DeckForm 
      handleCancel = {handleCancel}
      handleSubmit = {handleSubmit}
      handleChange = {handleChange}
      form = {form}
      title={"Create"}
      />
  )
    
}
