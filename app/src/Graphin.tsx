import React, { useState } from "react";
import Graphin, { Behaviors } from "@antv/graphin";
import { MiniMap } from "@antv/graphin-components";
import { Toolbar } from "@antv/graphin-components";
import { ContextMenu, FishEye } from "@antv/graphin-components";
import { Legend } from "@antv/graphin-components";

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;
const { Menu } = ContextMenu;

const colors = [
  "black",
  "green",
  "yellow",
  "red",
  "blue",
  "grey",
  "orange",
  "purple",
  "pink",
];

export const Graph = ({ graph }: { graph: any }) => {
  const [visible, setVisible] = useState(false);

  graph?.nodes.forEach((node: any) => {
    node.style = {
      label: { value: node.name },
      keyshape: {
        size: node.symbolSize,
        fill: colors[node.category],
        fillOpacity: 0.8,
        stroke: colors[node.category],
      },
    };
  });

  graph?.edges.forEach((edge: any) => {
    edge.type = "quadratic";
  });

  const handleZoom = (graphinContext: any, config: any) => {
    const { apis } = graphinContext;
    const { handleZoomIn, handleZoomOut } = apis;
    if (config.key === "zoomIn") handleZoomIn();
    else if (config.key === "zoomOut") handleZoomOut();
  };

  const handleClick = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      {graph ? (
        <Graphin
          data={graph}
          layout={{
            type: "preset",
          }}
          style={{ width: "90vw", height: "90vh", border: "1px solid black" }}
          fitView
        >
          <MiniMap visible />
          <Toolbar
            options={[
              { key: "zoomOut", name: <span>Zoom in</span> },
              { key: "zoomIn", name: <span>Zoom out</span> },
            ]}
            onChange={handleZoom}
          />
          <ZoomCanvas />
          <DragCanvas />
          <DragNode disabled />
          <ActivateRelations trigger="click" />
          <ContextMenu bindType="canvas">
            <Menu bindType=" canvas ">
              <Menu.Item onClick={handleClick}> FishEye </Menu.Item>
            </Menu>
          </ContextMenu>
          <Legend
            bindType="node"
            sortKey="style.keyshape.stroke"
            colorKey="style.keyshape.stroke"
          >
            <Legend.Node />
          </Legend>
          <FishEye
            options={{}}
            visible={visible}
            handleEscListener={handleClose}
          />
        </Graphin>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
