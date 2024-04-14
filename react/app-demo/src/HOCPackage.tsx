import React from "react";

const WithCard = (title) => (Component) => {
  return (props) => {
    const diyStyle = {
      border: "1px solid #000",
      padding: "12px",
      margin: "12px",
      borderRadius: "4px",
    };

    return (
      <div style={diyStyle}>
        <h2>{title}</h2>
        <Component {...props} />
      </div>
    );
  };
};

const SimpleButton = ({ text }) => {
  return <button>{text}</button>;
};

const HOCPackage = WithCard("Card Button")(SimpleButton);

export default HOCPackage;
