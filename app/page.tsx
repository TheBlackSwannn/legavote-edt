"use client";

import { HorizontalLink, VerticalLink } from "@/components/link";
import TableNodeType from "@/components/table";
import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  FitViewOptions,
  Node,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "eleve",
    type: "tableNode",
    position: { x: 100, y: 200 },
    data: {
      type: "standard",
      label: "Eleve",
      columns: [
        { name: "id : UUID", type: "primaryKey" },
        { name: "nom : VARCHAR(255)", type: "standard" },
        { name: "prenom : VARCHAR(255)", type: "standard" },
        { name: "date_naissance : DATE", type: "standard" },
        { name: "classe : UUID", type: "foreignKey" },
      ],
      handleTop: true,
    },
  },
  {
    id: "enseignant",
    type: "tableNode",
    position: { x: 800, y: 0 },
    data: {
      type: "standard",
      label: "Enseignant",
      columns: [
        { name: "id : UUID", type: "primaryKey" },
        { name: "nom : VARCHAR(255)", type: "standard" },
        { name: "prenom : VARCHAR(255)", type: "standard" },
        { name: "matiere : UUID", type: "foreignKey" },
      ],
      handleLeft: true,
      handleBottom: true,
    },
  },
  {
    id: "classe",
    type: "tableNode",
    position: { x: 100, y: 0 },
    data: {
      type: "standard",
      label: "Classe",
      columns: [
        { name: "id : UUID", type: "primaryKey" },
        { name: "nom : VARCHAR(255)", type: "standard" },
      ],
      handleRight: true,
      handleBottom: true,
    },
  },
  {
    id: "matiere",
    type: "tableNode",
    position: { x: 800, y: 250 },
    data: {
      type: "standard",
      label: "Matiere",
      columns: [
        { name: "id : UUID", type: "primaryKey" },
        { name: "nom : VARCHAR(255)", type: "standard" },
      ],
      handleTop: true,
      handleLeft: true,
    },
  },
  {
    id: "salle",
    type: "tableNode",
    position: { x: 500, y: 350 },
    data: {
      type: "standard",
      label: "Salle",
      columns: [
        { name: "id : UUID", type: "primaryKey" },
        { name: "nom : VARCHAR(255)", type: "standard" },
        { name: "capacite : INT", type: "standard" },
      ],
      handleTop: true,
    },
  },
  {
    id: "emploi_du_temps",
    type: "tableNode",
    position: { x: 500, y: 0 },
    data: {
      type: "join",
      label: "Emploi_du_temps",
      columns: [
        { name: "id : UUID", type: "primaryKey" },
        { name: "enseignant : UUID", type: "foreignKey" },
        { name: "matiere : UUID", type: "foreignKey" },
        { name: "classe : UUID", type: "foreignKey" },
        { name: "salle : UUID", type: "foreignKey" },
        { name: "jour : DATE", type: "standard" },
        { name: "heure_debut : TIME", type: "standard" },
        { name: "heure_fin : TIME", type: "standard" },
      ],
      handleLeft: true,
      handleRight: true,
      handleBottom: true,
      customHandles: [
        { id: "bottom-right", position: Position.Right, style: { top: "90%" } },
      ],
    },
  },
];

const initialEdges = [
  {
    id: "e-classe-eleve",
    source: "classe",
    target: "eleve",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: "verticalLink",
    data: { sourceLabel: "11", targetLabel: "1*" },
  },
  {
    id: "e-classe-emploi_du_temps",
    source: "classe",
    target: "emploi_du_temps",
    sourceHandle: "right",
    targetHandle: "left",
    type: "horizontalLink",
    data: { sourceLabel: "11", targetLabel: "0*" },
  },
  {
    id: "e-emploi_du_temps-salle",
    source: "emploi_du_temps",
    target: "salle",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: "verticalLink",
    data: { sourceLabel: "0*", targetLabel: "11" },
  },
  {
    id: "e-emploi_du_temps-enseignant",
    source: "emploi_du_temps",
    target: "enseignant",
    sourceHandle: "right",
    targetHandle: "left",
    type: "horizontalLink",
    data: { sourceLabel: "0*", targetLabel: "11" },
  },
  {
    id: "e-emploi_du_temps-matiere",
    source: "emploi_du_temps",
    target: "matiere",
    sourceHandle: "bottom-right",
    targetHandle: "left",
    type: "horizontalLink",
    data: { sourceLabel: "0*", targetLabel: "11" },
  },
  {
    id: "e-enseignant-matiere",
    source: "enseignant",
    target: "matiere",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: "verticalLink",
    data: { sourceLabel: "0*", targetLabel: "0*" },
  },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ tableNode: TableNodeType }), []);
  const edgeTypes = useMemo(
    () => ({ verticalLink: VerticalLink, horizontalLink: HorizontalLink }),
    []
  );

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <div className="w-full h-1/6 flex flex-col justify-center items-center bg-gray-800 text-white gap-2">
        <h1 className="text-4xl text-center">Legavote - Modélisation EDT</h1>
        <p className="text-lg text-center">Schéma relationnel</p>
      </div>
      <div className="w-full h-5/6">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          fitView
          fitViewOptions={fitViewOptions}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </main>
  );
}
