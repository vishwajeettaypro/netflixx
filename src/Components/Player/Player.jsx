import React from 'react';
import "./Player.scss"

import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import video from '../../video.mp4';  // Ensure the video file is being imported correctly
console.log("hello");

export default function Layer() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(1)} />
        </div>
        <video src={video} loop controls unmuted />
      </div>
    </div>
  );
}

