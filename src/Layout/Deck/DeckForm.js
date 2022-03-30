import React from "react";
import { Link } from "react-router-dom";

export default function DeckForm({form, handleCancel, handleChange, handleSubmit, title}) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h2>{title} Deck</h2>
      <div className="form-group">
        <form handleSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <div>
            <input
              placeholder="Deck Name"
              className="form-control"
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div>
            <label htmlFor="description" className="mt-2">Description</label>
            <div>
              <textarea
                className="form-control"
                name="description"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Brief description of the deck"
                onChange={handleChange}
                value={form.description}
              ></textarea>
            </div>
          </div>

          <button
            className="btn btn-secondary mr-2 mt-2"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mr-2 mt-2"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
