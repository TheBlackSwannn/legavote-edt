import { NodeData } from "@/types/definitions";
import { Handle, NodeProps, Position } from "reactflow";
import { ForeignKeyField, PrimaryKeyField, StandardField } from "./field";

function TableNode({ data }: NodeProps<NodeData>) {
  return (
    <>
      <div
        className={`relative flex flex-col border-[1px] border-black border-${
          data.type === "join" ? "dashed" : "solid"
        } bg-yellow-400/60 p-2`}
      >
        <h3 className="mx-auto text-center mb-2 text-lg">{data.label}</h3>
        <div className="absolute left-0 top-10 w-full h-[1px] bg-black/60" />
        <ul className="py-2 px-4 text-md">
          {data.columns.map((column) => (
            <>
              {column.type === "primaryKey" ? (
                <PrimaryKeyField key={column.name} name={column.name} />
              ) : column.type === "foreignKey" ? (
                <ForeignKeyField key={column.name} name={column.name} />
              ) : (
                <StandardField key={column.name} name={column.name} />
              )}
            </>
          ))}
        </ul>
      </div>

      {data.handleTop && (
        <>
          <Handle type="target" position={Position.Top} id="top" />
          <Handle type="source" position={Position.Top} id="top" />
        </>
      )}
      {data.handleLeft && (
        <>
          <Handle type="target" position={Position.Left} id="left" />
          <Handle type="source" position={Position.Left} id="left" />
        </>
      )}
      {data.handleRight && (
        <>
          <Handle type="target" position={Position.Right} id="right" />
          <Handle type="source" position={Position.Right} id="right" />
        </>
      )}
      {data.handleBottom && (
        <>
          <Handle type="target" position={Position.Bottom} id="bottom" />
          <Handle type="source" position={Position.Bottom} id="bottom" />
        </>
      )}

      {data.customHandles?.map((handle, i) => (
        <>
          <Handle
            key={`custom-${i}`}
            id={handle.id}
            type="source"
            position={handle.position}
            style={handle.style}
          />
          <Handle
            key={`custom-${i}`}
            id={handle.id}
            type="target"
            position={handle.position}
            style={handle.style}
          />
        </>
      ))}
    </>
  );
}

export default TableNode;
