import React from 'react';
// import ReactPlayer from 'react-player';
import styled from 'styled-components';
// import video from '../assets/video/showreel264VTB2k.mp4';
import video from '../assets/video/rob4.mp4';
import { device } from '../utils/device';

const VideoWrapper = styled.div`
  max-width: 1500px;
  width: 100vw;
  height: 100%;
  margin-top: -8rem;
  @media ${device.mobileL} {
    /* margin-top: 0rem; */
    margin-top: -8rem;
  }
  video {
    max-width: 1500px;
    width: 100vw;
    height: 100%;
  }
`;

function Video() {
  return (
    <VideoWrapper>
      {/* <ReactPlayer
        playing
        height="400px"
        width="600px"
        url={[
          { src: '../assets/video/showreel264VTB2k.mp4', type: 'video/mp4' },
          { src: '../assets/video/showreel7hd.webm', type: 'video/webm' },
          { src: '../assets/video/showreel2652k.mp4', type: 'video/mp4' },
        ]}
      /> */}
      <video autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>
    </VideoWrapper>
  );
}

export default Video;
