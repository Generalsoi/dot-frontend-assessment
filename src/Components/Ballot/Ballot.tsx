import { FC } from "react";
import { ballotItem } from "../../App";
import "./Ballot.css";

interface ballotProps extends ballotItem {
  selected: boolean;
  category: string;
  handleSelect: (category: string, id: string) => void;
}

const Ballot: FC<ballotProps> = ({
  id,
  photoUrL,
  title,
  handleSelect,
  selected,
  category,
}) => {
  // let selectedId = []

  return (
    <div className={selected ? "selected-ballot ballot" : "ballot"}>
      <span>
        <h4>{title}</h4>
        <img src={photoUrL} alt={title} />
        <button onClick={() => handleSelect(category, id)}>
          {selected ? "Selected" : "Select"}
        </button>
      </span>
    </div>
  );
};

export default Ballot;
