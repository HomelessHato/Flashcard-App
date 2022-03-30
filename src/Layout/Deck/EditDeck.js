import React, {useState, useEffect} from "react";
import { updateDeck, readDeck } from "../../utils/api";
import { useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";

export default function EditDeck(){
    const { deckId } = useParams();
    const history = useHistory();
    const initialFormState = {
      name: "",
      description: "",
    };

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
      const ac = new AbortController();
      async function fetchDeck() {
        try {
          const response = await readDeck(deckId, ac.signal);
          setForm(response);
        } catch (error) {
          if (error.type !== "AbortError") {
            console.log(error);
          }
        }
      }
      fetchDeck();
      return () => ac.abort();
    }, [deckId]);

    const handleChange = ({ target }) => {
      setForm({ ...form, [target.name]: target.value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      async function fetchDeck() {
        updateDeck(form);
        setForm(initialFormState);
        history.push(`/decks/${deckId}`);
      }
      fetchDeck();
    };

    const handleCancel = (event) => {
      event.preventDefault();
      history.push("/");
    };

    return (
      <DeckForm
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        title={"Edit"}
      />
    );
}
