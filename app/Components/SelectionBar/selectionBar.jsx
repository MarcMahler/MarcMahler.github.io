import "./selectionBar.css";

export default function SelectionBar({ options, selected, setSelected }) {
  return (
    <div className="bar">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: selected === option ? "2px solid blue" : "1px solid gray",
            backgroundColor: selected === option ? "lightblue" : "white",
            cursor: "pointer",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}