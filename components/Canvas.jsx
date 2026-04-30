"use client"
import { useRef, useCallback, useState } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { customNodeTypes } from './nodes/CustomNodes'

export default function Canvas({ nodes, setNodes, edges, setEdges, readOnly = false }) {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const onNodesChange = useCallback(
    (changes) => {
      if (!readOnly && setNodes) {
        setNodes((nds) => applyNodeChanges(changes, nds))
      }
    },
    [setNodes, readOnly]
  )

  const onEdgesChange = useCallback(
    (changes) => {
      if (!readOnly && setEdges) {
        setEdges((eds) => applyEdgeChanges(changes, eds))
      }
    },
    [setEdges, readOnly]
  )

  const onConnect = useCallback(
    (connection) => {
      if (!readOnly && setEdges) {
        setEdges((eds) => addEdge(connection, eds))
      }
    },
    [setEdges, readOnly]
  )

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance)
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()
      if (readOnly || !reactFlowInstance || !reactFlowWrapper.current || !setNodes) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      if (!type) return

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: Date.now().toString(),
        type: type, // use the dropped type (e.g. 'api', 'db', 'cache', 'lb')
        position,
        data: {}, // Label is handled internally by CustomNodes, but we can pass more data if needed
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, readOnly]
  )

  const onDragOver = (event) => {
    event.preventDefault()
    if (readOnly) {
      event.dataTransfer.dropEffect = 'none'
      return
    }
    event.dataTransfer.dropEffect = 'move'
  }

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative" style={{ minHeight: 'calc(100vh - 96px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodeTypes}
        onInit={onInit}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={readOnly ? undefined : onDrop}
        onDragOver={readOnly ? undefined : onDragOver}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
        fitView
      >
        <MiniMap 
          style={{ background: '#1e293b' }} 
          nodeColor={(node) => {
            switch (node.type) {
              case 'api': return '#3b82f6'
              case 'db': return '#22c55e'
              case 'cache': return '#ef4444'
              case 'lb': return '#a855f7'
              default: return '#94a3b8'
            }
          }}
          maskColor="rgba(15, 23, 42, 0.7)"
        />
        <Controls 
          className="bg-slate-800 border-slate-700 fill-slate-300" 
          showInteractive={false} 
        />
        <Background color="#334155" gap={16} size={1} />
      </ReactFlow>
    </div>
  )
}
