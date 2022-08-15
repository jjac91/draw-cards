import React from "react";

const Card = ({ id, image }) => {
  return (
    <div>
      <img src={image} alt={id} />
    </div>
  );
};

export default Card;
