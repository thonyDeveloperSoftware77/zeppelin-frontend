import React from "react";

const Section = ({ children, className = "section" }) => {
  return (
    <section
      style={{marginTop: "7%"}}
      className="m-4 p-4 mt-4 bg-white shadow-md p-6 rounded-lg min-h-screen flex flex-col"
    >
      {children}
    </section>
  );
};

export default Section;
