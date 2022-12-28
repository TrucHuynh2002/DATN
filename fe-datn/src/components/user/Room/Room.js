import React from 'react';
import RoomContainer from './RoomContainer';
import { TabTitle } from '../../title';

function Room() {
  TabTitle('Phòng');
  return (
    <>
       <RoomContainer />
    </>
  )
}

export default Room