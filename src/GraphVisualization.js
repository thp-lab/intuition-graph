import React, { useEffect, useState, useCallback, useRef } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";
import { fetchTriples, fetchTriplesForNode } from "./api";
import { transformToGraphData } from "./graphData";
import GraphLegend from "./GraphLegend";
import GraphVR from "./GraphVR";
import * as d3 from 'd3';

const GraphVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [initialGraphData, setInitialGraphData] = useState(null);
  const [previousGraphData, setPreviousGraphData] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [viewMode, setViewMode] = useState("2D");
  const fgRef = useRef();

  // Fetch and transform graph data
  useEffect(() => {
    const loadData = async () => {
      try {
        const triples = await fetchTriples();
        const data = transformToGraphData(triples);
        setGraphData(data);
        setInitialGraphData(data);
      } catch (error) {
        console.error("Error loading graph data:", error);
      }
    };
    loadData();
  }, []);

  // Handle node clicks
  const handleNodeClick = useCallback(
    async (node) => {
      if (fgRef.current) {
        try {
          // Sauvegarder la position actuelle du nœud
          const nodePosition = {
            x: node.x,
            y: node.y,
            z: node.z || 0  // En 2D, z sera 0
          };

          // Récupérer les nouveaux triplets
          const filteredTriples = await fetchTriplesForNode(node.id);
          const newGraphData = transformToGraphData(filteredTriples);

          // Assigner la position sauvegardée au nœud correspondant dans le nouveau graphe
          const targetNode = newGraphData.nodes.find(n => n.id === node.id);
          if (targetNode) {
            targetNode.x = nodePosition.x;
            targetNode.y = nodePosition.y;
            if (viewMode === '3D') targetNode.z = nodePosition.z;
            
            // Fixer le nœud en place pendant l'initialisation du graphe
            targetNode.fx = nodePosition.x;
            targetNode.fy = nodePosition.y;
            if (viewMode === '3D') targetNode.fz = nodePosition.z;
          }

          setGraphData(newGraphData);

          // Attendre que le graphe soit stabilisé
          fgRef.current.d3Force('center', null);
          await new Promise(resolve => {
            const handleEngineStop = () => {
              // Libérer le nœud une fois le graphe stabilisé
              if (targetNode) {
                targetNode.fx = undefined;
                targetNode.fy = undefined;
                if (viewMode === '3D') targetNode.fz = undefined;
              }
              
              if (viewMode === '3D') {
                const distance = 40;
                const distRatio = 1 + distance / Math.hypot(nodePosition.x, nodePosition.y, nodePosition.z);
                
                fgRef.current.cameraPosition(
                  {
                    x: nodePosition.x * distRatio,
                    y: nodePosition.y * distRatio,
                    z: nodePosition.z * distRatio
                  },
                  targetNode,
                  500
                );
              } else {
                // Pour 2D, on utilise zoomToFit autour du nœud
                const distance = 100;
                fgRef.current.centerAt(nodePosition.x, nodePosition.y, 1000);
                fgRef.current.zoom(8, 1000);
              }

              fgRef.current.d3Force('center', d3.forceCenter());
              fgRef.current.removeEventListener('engineStop', handleEngineStop);
              resolve();
            };

            fgRef.current.addEventListener('engineStop', handleEngineStop);
          });

        } catch (error) {
          console.error("Erreur lors de la récupération des triplets :", error);
        }
      }
    },
    [viewMode]
  );

  // Fonction pour réinitialiser le graphique
  const resetGraph = () => {
    setGraphData(initialGraphData);
    setPreviousGraphData(null);
  };

  // Fit graph to view after initial render
  const handleEngineStop = useCallback(() => {
    if (isInitialLoad && fgRef.current) {
      fgRef.current.zoomToFit(400, 100);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // Update graph size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (fgRef.current) {
        fgRef.current.width = window.innerWidth;
        fgRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Color mapping for graph legend
  const colorMapping = {
    subject: "#4361EE",
    predicate: "#FF9800",
    object: "#9D4EDD",
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Bouton pour réinitialiser le graphique */}
      <button onClick={resetGraph} style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}>
        Revenir au graphique initial
      </button>

      {/* View mode selector */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#444",
          color: "#fff",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <label htmlFor="viewMode" style={{ fontSize: "14px" }}>
          View Mode:
        </label>
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="VR">VR</option>
        </select>
      </div>

      {/* Graph rendering based on view mode */}
      {viewMode === "2D" && (
        <ForceGraph2D
          ref={(el) => (fgRef.current = el)}
          graphData={graphData}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.label || "";
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = node.color || "#000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, node.x, node.y);
          }}
          linkColor={() => "#666"}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.02}
          nodeAutoColorBy="group"
          onEngineStop={handleEngineStop}
          onNodeClick={handleNodeClick}
        />
      )}

      {viewMode === "3D" && (
        <ForceGraph3D
          ref={(el) => (fgRef.current = el)}
          graphData={graphData}
          controlType="fly"
          nodeLabel="label"
          onNodeClick={handleNodeClick}
          linkColor={() => "#666"}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          nodeAutoColorBy="group"
          nodeThreeObject={(node) => {
            const sprite = new SpriteText(node.label || "");
            sprite.color = node.color || "#000";
            sprite.textHeight = 2;
            return sprite;
          }}
          onEngineStop={handleEngineStop}
        />
      )}

      {viewMode === "VR" && (
        <GraphVR graphData={graphData} onNodeClick={handleNodeClick} />
      )}

      {/* Graph legend */}
      <GraphLegend colors={colorMapping} />
    </div>
  );
};

export default GraphVisualization;