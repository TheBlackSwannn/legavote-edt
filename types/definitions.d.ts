import { Node, Position } from "reactflow";

type Column = {
  name: string;
  type: string;
};

type NodeData = {
  label: string;
  columns: Column[];
  type: string;
  handleTop: boolean;
  handleBottom: boolean;
  handleLeft: boolean;
  handleRight: boolean;
  customHandles: {
    id: string;
    position: Position.Top | Position.Bottom | Position.Left | Position.Right;
    style: React.CSSProperties;
  }[];
};

type TableNodeType = Node<NodeData>;

export type { NodeData, TableNodeType };
