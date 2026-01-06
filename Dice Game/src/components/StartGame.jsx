import "./StartGame.css";

const StartGame = (props) => {
  return (
    <div className="container">
      <div>
        <img src="/images/dices.png" />
      </div>
      <div className="content">
        <h1>Dice Game</h1>
        <button onClick={props.toggle} className="btn">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default StartGame;
