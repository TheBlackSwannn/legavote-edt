import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "reactflow";

function VerticalLink({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${sourceX}px, ${
              sourceY + 5
            }px)`,
            pointerEvents: "none",
            fontSize: ".8rem",
            background: "transparent",
            display: "flex",
            gap: "10px",
          }}
          className="nodrag nopan"
        >
          {data?.sourceLabel.split("").map((char: string, index: number) => (
            <div key={index} className="text-center">
              {char}
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${targetX}px, ${
                targetY - 5
              }px)`,
              pointerEvents: "none",
              fontSize: ".8rem",
              background: "transparent",
              display: "flex",
              gap: "10px",
            }}
            className="nodrag nopan"
          >
            {data?.targetLabel.split("").map((char: string, index: number) => (
              <div key={index} className="text-center">
                {char}
              </div>
            ))}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

function HorizontalLink({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(${sourceX}px, ${sourceY}px) translate(-50%, -50%)`,
            pointerEvents: "none",
            fontSize: ".8rem",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          className="nodrag nopan"
        >
          {data?.sourceLabel.split("").map((char: string, index: number) => (
            <div key={index} className="text-center">
              {char}
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              position: "absolute",
              transform: `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`,
              pointerEvents: "none",
              fontSize: ".8rem",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            className="nodrag nopan"
          >
            {data?.targetLabel.split("").map((char: string, index: number) => (
              <div key={index} className="text-center">
                {char}
              </div>
            ))}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export { HorizontalLink, VerticalLink };
