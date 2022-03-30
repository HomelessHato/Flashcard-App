import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function CardForm({
  handleChange,
  handleSave,
  handleDone,
  form,
  handleSubmit,
  handleCancel,
  title,
}) {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
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
  }, [deckId]);

  const buttons = !cardId ? (
    <div>
      <button
        className="btn btn-secondary mr-2"
        type="button"
        onClick={handleDone}
      >
        Done
      </button>
      <button
        className="btn btn-primary mr-2"
        type="submit"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  ) : (
    <div>
      <button
        className="btn btn-secondary mr-2"
        type="button"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button 
      className="btn btn-primary mr-2" 
      type="submit" 
      onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">{title} Card</li>
        </ol>
      </nav>
      <h2>
        {deck.name}: {title} Card
      </h2>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <form>
          <div className="form-group">
            <textarea
              placeholder="Front side of card"
              className="form-control"
              id="front"
              name="front"
              rows="3"
              onChange={handleChange}
              value={form.front}
            ></textarea>
          </div>

          <label htmlFor="back">Back</label>
          <div className="form-group">
            <textarea
              className="form-control"
              id="back"
              rows="3"
              name="back"
              placeholder="Back side of card"
              onChange={handleChange}
              value={form.back}
            ></textarea>
          </div>
          {buttons}
        </form>
      </div>
    </div>
  );
}
