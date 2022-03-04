import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const FrontPage = () => {
  return (
    <div>
      <div>
        <h1>Do you master javascript?</h1>
        <h2>Take a test</h2>
      </div>
      <div>
        <Link to="/question">
          <button>New quiz</button>
        </Link>
        <Link to="/answer/*">
          <button>Show anwers</button>
        </Link>
      </div>
    </div>
  );
};
export default FrontPage;
