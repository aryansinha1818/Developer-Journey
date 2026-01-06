import "../styled/RollDice.css";

const RoleDice = ({ roleDice, currentDice }) => {
  return (
    <div className="dice_container">
      <div className="dice_image" onClick={roleDice}>
        <img
          src={`/images/dice_${currentDice}.png`}
          alt={`dice ${currentDice}`}
        />
      </div>
      <p>Click on the dice to roll</p>
    </div>
  );
};

export default RoleDice;
