import "../styled/Rules.css";

const Rules = () => {
  return (
    <div className="container">
      <h2>How to play dice game</h2>
      <div className="text">
        <p>&bull; Select any number</p>
        <p>&bull; Click on dice image</p>
        <p>
          &bull; If selected number is equal to dice number you will get same
          points as dice , if you get wrong guess then 2 point will be dedcuted.
        </p>
      </div>
    </div>
  );
};

export default Rules;
