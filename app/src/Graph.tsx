import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
export const Graph = () => {
  const [graph, setGraph] = useState<any>();

  useEffect(() => {
    fetch("/les-miserables.json")
      .then((res) => res.json())
      .then((json) => setGraph(json));
  }, []);

  const options = {
    title: {
      text: "Les Miserables",
      subtext: "Default layout",
      top: "bottom",
      left: "right",
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: graph?.categories.map((a: any) => {
          return a.name;
        }),
      },
    ],
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "none",
        data: graph?.nodes,
        links: graph?.links,
        categories: graph?.categories,
        roam: true,
        legendHoverLink: false,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        labelLayout: {
          hideOverlap: true,
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
          },
        },
      },
    ],
  };

  return (
    <>
      <h1>Les miserables</h1>
      {graph ? (
        <ReactECharts
          option={options}
          style={{ width: "90vw", height: "90vh" }}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
