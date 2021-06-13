import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import { Graph as Echarts } from "./Echarts";
import { Graph as Graphin } from "./Graphin";

const App = () => {
  const [graph, setGraph] = useState<any>();

  useEffect(() => {
    fetch("/les-miserables.json")
      .then((res) => res.json())
      .then((json) => setGraph(json));
  }, []);

  return (
    <BrowserRouter>
      <h1>Les miserables</h1>
      <NavLink to="/echarts">
        <button>Echarts</button>
      </NavLink>
      <NavLink to="/graphin">
        <button>Graphin</button>
      </NavLink>

      <Switch>
        <Route path="/echarts" render={(props) => <Echarts graph={graph} />} />
        <Route path="/graphin" render={(props) => <Graphin graph={graph} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
