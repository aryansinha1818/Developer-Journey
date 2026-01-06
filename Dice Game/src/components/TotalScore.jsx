import "../styled/TotalScore.css";

const TotalScore = ({ score }) => {
  return (
    <div className="score_container">
      <h1>{score}</h1>
      <p>Total Score</p>
    </div>
  );
};

export default TotalScore;
