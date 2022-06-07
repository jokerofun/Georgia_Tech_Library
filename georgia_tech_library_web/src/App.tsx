import React, { useEffect } from "react";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { observer } from "mobx-react-lite";
import MainContent from "./components/MainContent";
import { Row, Container } from "react-bootstrap";
import Navigation from "./components/Navigation";

const App = observer(function App() {
  const cardStore = useStore("cardStore");
  const catalogStore = useStore("catalogStore");
  const itemStore = useStore("itemStore");
  const borrowingActivityStore = useStore("borrowingActivityStore");

  function init() {
    cardStore.fetch();
    catalogStore.fetch();
    itemStore.fetch();
    // borrowingActivityStore.fetch();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Container fluid className="vh-100">
      <Row className="h-20 bg-primary">
        <Navigation />
      </Row>
      <Row className="h-80">
        <MainContent />
      </Row>
    </Container>
  );
});

export default App;
