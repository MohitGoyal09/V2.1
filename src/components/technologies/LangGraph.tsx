import { LangGraph } from '@lobehub/icons';
import React from 'react';

export default function Langgraph() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          marginRight: '6px',
        }}
      >
        <LangGraph.Color size={22} />
      </div>
    </>
  );
}