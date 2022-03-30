import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Deck/DeckList";
import StudyPage from "./Cards/StudyPage";
import CreateDeck from "./Deck/CreateDeck";
import ViewDeck from "./Deck/DeckScreen";
import CreateCards from "./Cards/CreateCards";
import EditCard from "./Cards/EditCard";
import EditDeck from "./Deck/EditDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
        <Route exact path="/">
          <DeckList />
        </Route>
        <Route path='/decks/:deckId/study'>
          <StudyPage />
        </Route>
        <Route path='/decks/new'>
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
            <CreateCards />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
        <Route path="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route>
          <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
