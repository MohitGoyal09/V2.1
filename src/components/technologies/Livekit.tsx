import { LiveKit } from '@lobehub/icons';
import React from 'react';

export default function Livekit() {
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
        <LiveKit.Color size={22} />
      </div>
    </>
  );
}