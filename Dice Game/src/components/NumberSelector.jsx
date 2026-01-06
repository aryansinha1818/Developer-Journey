import "../styled/NumberSelector.css";

const NumberSelector = ({
  setError,
  error,
  selectedNumber,
  setSelectedNumber,
}) => {
  const arrNumber = [1, 2, 3, 4, 5, 6];

  const numberSelectorHandler = (value) => {
    setSelectedNumber(value);
    setError("");
  };

  console.log(selectedNumber);
  return (
    <div className="number_select">
      <p className="imp" style={{ fontSize: "32px", fontWeight: "bold" }}>
        {error}
      </p>
      <div className="flex">
        {arrNumber.map((value, i) => (
          <div
            className={`box ${
              value === selectedNumber ? "isSelected" : "notSelected"
            }`}
            key={i}
            onClick={() => numberSelectorHandler(value)}
          >
            {value}
          </div>
        ))}
      </div>
      <p
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Select Number
      </p>
    </div>
  );
};

export default NumberSelector;
