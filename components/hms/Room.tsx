import React from 'react';

interface Props {
  roomId: string;
}

const Room = ({ roomId }: Props) => {
  return <div>Room: {roomId}</div>;
};

export default Room;
