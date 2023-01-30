import React, { FC, useEffect, useState } from "react";
import "./App.css";
import Ballot from "./Components/Ballot/Ballot";

//declaring types for items inside the ballot
export type ballotItem = {
  id: string;
  photoUrL: string;
  title: string;
};
//declaring types for ballot data
type ballot = { id: string; items: ballotItem[]; title: string };
type selectedBallots = { [key: string]: string };

export type ButtonProps = {};

const App: FC = () => {
  const [ballotData, setBallotData] = useState<ballot[]>([]);
  const [selectedBallots, setSelectedBallots] = useState<selectedBallots>({});
  const [modal, setModal] = useState(false);

  const fetchBallotData = async () => {
    const res = await fetch("./api/getBallotData", {
      mode: "no-cors",
    });
    const data = await res.json();
    setBallotData(data.items);
    return data;
  };

  const handleSelect = (category: string, id: string) => {
    const eventualResult = { ...selectedBallots };
    eventualResult[category] = id;
    setSelectedBallots(eventualResult);
  };

  console.log(selectedBallots);

  const handleModal = () => {
    setSelectedBallots({});
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    fetchBallotData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GOLDEN GLOBE AWARDS</h1>
      </header>

      <div className="category-heading">
        {ballotData.map((category) => (
          <div key={category.id}>
            <h3>{category.title}</h3>
            <div className="ballot-items">
              {category.items.map((item) => (
                <Ballot
                  key={item.id}
                  category={category.id}
                  handleSelect={handleSelect}
                  selected={selectedBallots[category.id] === item.id}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="submit-btn">
        <button onClick={handleModal}>SUBMIT VOTE</button>
      </section>

      {modal && (
        <div
          className="modal-div"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div className="modal-card">
            <p>Voted Successfully</p>
            <div className="close-icon" onClick={handleCloseModal}>
              X
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
