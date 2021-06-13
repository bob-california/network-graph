import React from "react";
import ReactECharts from "echarts-for-react";

export const Graph = ({ graph }: { graph: any }) => {
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
        links: graph?.edges,
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
