import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const initialFormState = {
    front: "",
    back: "",
  };

  const { deckId, cardId } = useParams();

  const [setDeck] = useState([]);
  const [form, setForm] = useState(initialFormState);

  const history = useHistory();

  useEffect(() => {
    const ac = new AbortController();
    async function fetchDeck() {
      try {
        const response = await readDeck(deckId, ac.signal);
        setDeck(response);
      } catch (error) {
        if (error.type !== "AbortError") {
          console.log(error);
        }
      }
    }
    fetchDeck();
    return () => ac.abort();
  }, [deckId, setDeck]);

  useEffect(() => {
    const ac = new AbortController();
    async function fetchCard() {
      try {
        const response = await readCard(cardId, ac.signal);
        setForm(response);
      } catch (error) {
        if (error.type !== "AbortError") {
          console.log(error);
        }
      }
    }
    fetchCard();
    return () => ac.abort();
  }, [cardId]);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function fetchUpdateCard() {
      updateCard(form);
      setForm({ initialFormState });
      history.push(`/decks/${deckId}`);
    }
    fetchUpdateCard();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  console.log(form);

  return (
    <CardForm
      form={form}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleCancel={handleCancel}
      title={"Edit"}
    />
  );
}
