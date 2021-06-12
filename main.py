import json

from streamlit_echarts import st_echarts

with open("./les-miserables.json", "r") as f:
    graph = json.load(f)

for idx, node in enumerate(graph["nodes"]):
    graph["nodes"][idx]["label"] = {"show": node["symbolSize"] > 30}

option = {
    "title": {
        "text": "Les Miserables",
        "subtext": "Default layout",
        "top": "bottom",
        "left": "right",
    },
    "tooltip": {},
    "legend": [{"data": [a["name"] for a in graph["categories"]]}],
    "animationDuration": 1500,
    "animationEasingUpdate": "quinticInOut",
    "series": [
        {
            "name": "Les Miserables",
            "type": "graph",
            "layout": "none",
            "data": graph["nodes"],
            "links": graph["links"],
            "categories": graph["categories"],
            "roam": True,
            "legendHoverLink": False,
            "label": {"show": True, "position": "right", "formatter": "{b}"},
            "labelLayout": {
                "hideOverlap": True,
            },
            "lineStyle": {"color": "source", "curveness": 0.3},
            "emphasis": {"focus": "adjacency", "lineStyle": {"width": 10}},
        }
    ],
}
st_echarts(option, height="500px")
