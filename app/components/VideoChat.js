'use client';

import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

const VideoChat = ({ roomId }) => {
  const [socket, setSocket] = useState(null);
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);

  const userVideoRef = useRef();
  const peersRef = useRef([]);
  const peerVideosRef = useRef([]);

  useEffect(() => {
    const socketIo = io();
    setSocket(socketIo);

    // Get media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (userVideoRef.current) userVideoRef.current.srcObject = mediaStream;
      });

    socketIo.emit('join-room', roomId);

    socketIo.on('user-joined', handleUserJoined);
    socketIo.on('receive-offer', handleReceiveOffer);
    socketIo.on('receive-answer', handleReceiveAnswer);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  function handleUserJoined(userId) {
    const peer = createPeer(userId, socket.id, stream);
    peersRef.current.push({ peerID: userId, peer });
    setPeers((prevPeers) => [...prevPeers, peer]);
  }

  function createPeer(userIdToSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (offer) => {
      socket.emit('offer', { roomId, offer, from: callerID });
    });

    peer.on('stream', (remoteStream) => {
      addRemoteStream(remoteStream, userIdToSignal);
    });

    return peer;
  }

  function handleReceiveOffer({ offer, from }) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (answer) => {
      socket.emit('answer', { roomId, answer, to: from });
    });

    peer.on('stream', (remoteStream) => {
      addRemoteStream(remoteStream, from);
    });

    peer.signal(offer);
    peersRef.current.push({ peerID: from, peer });
    setPeers((prevPeers) => [...prevPeers, peer]);
  }

  function handleReceiveAnswer({ answer }) {
    const item = peersRef.current.find((p) => p.peerID === answer.to);
    item.peer.signal(answer);
  }

  function addRemoteStream(stream, peerID) {
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.autoPlay = true;
    videoElement.playsInline = true;
    peerVideosRef.current.push({ peerID, videoElement });
    document.getElementById('peer-videos').append(videoElement);
  }

  return (
    <div>
      <h1>Simple Peer Video Chat - Room: {roomId}</h1>
      <div>
        <video ref={userVideoRef} autoPlay muted />
        <div id="peer-videos"></div>
      </div>
    </div>
  );
};

export default VideoChat;
