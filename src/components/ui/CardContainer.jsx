import React from "react";
import "./CardContainer.css";

const CardContainer = ({ children }) => {
    return (
        <div className="editor-container">
            {children}
        </div>
    );
};

export default CardContainer;
