'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Peer } from 'peerjs'

export default function WebRTCDemo() {
  const [roomId, setRoomId] = useState('')
  const [notification, setNotification] = useState('')
  const [peer, setPeer] = useState(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [currentPeer, setCurrentPeer] = useState<any>(null)
  const [screenSharing, setScreenSharing] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const screenVideoRef = useRef<HTMLVideoElement>(null)
  const localMediaRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  useEffect(() => {
    if (screenStream && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStream
    }
  }, [screenStream])

  const createRoom = () => {
    const newPeer = new Peer(roomId)
    setPeer(newPeer)

    newPeer.on('open', (id) => {
      console.log("Peer Room ID: ", id)
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream)
          notify("Waiting for peer to join.")
        })
        .catch((err) => console.log(err))
    })

    newPeer.on('call', (call) => {
      if (localStream) {
        call.answer(localStream)
      }
      call.on('stream', (stream) => {
        setRemoteStream(stream)
      })
      setCurrentPeer(call)
    })
  }

  const joinRoom = () => {
    const newPeer = new Peer()
    setPeer(newPeer)

    newPeer.on('open', (id) => {
      console.log("Connected room with Id: " + id)
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setLocalStream(stream)
          notify("Joining peer")
          const call = newPeer.call(roomId, stream)
          call.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream)
          })
          setCurrentPeer(call)
        })
        .catch((err) => console.log(err))
    })
  }

  const joinRoomWithoutCamShareScreen = () => {
    const newPeer = new Peer()
    setPeer(newPeer)

    newPeer.on('open', (id) => {
      console.log("Connected with Id: " + id)
      const fakeStream = createMediaStreamFake()
      notify("Joining peer")
      const call = newPeer.call(roomId, fakeStream)
      call.on('stream', (stream) => {
        setRemoteStream(stream)
      })
      setCurrentPeer(call)
      startScreenShare()
    })
  }

  const joinRoomShareVideoAsStream = () => {
    const newPeer = new Peer()
    setPeer(newPeer)

    newPeer.on('open', (id) => {
      console.log("Connected with Id: " + id)
          const stream = localMediaRef.current && localMediaRef.current.captureStream()
        localMediaRef.current.onplay = () => {
          if (localMediaRef.current) {
            const stream = localMediaRef.current.captureStream()
          }
          notify("Joining peer")
          const call = newPeer.call(roomId, stream)
          call.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream)
          })
        }
        localMediaRef.current.play()
      }
    })
  }

  const startScreenShare = () => {
    if (screenSharing) {
      stopScreenSharing()
      return
    }
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then((stream) => {
        setScreenStream(stream)
        const videoTrack = stream.getVideoTracks()[0]
        videoTrack.onended = () => {
          stopScreenSharing()
          const sender = currentPeer.peerConnection.getSenders().find((s) => s.track && s.track.kind === videoTrack.kind)
        if (currentPeer) {
          const sender = currentPeer.peerConnection.getSenders().find((s: RTCRtpSender) => s.track?.kind === videoTrack.kind)
          sender?.replaceTrack(videoTrack)
          setScreenSharing(true)
        }
      })
  }

  const stopScreenSharing = () => {
    if (!screenSharing) return
    const videoTrack = localStream?.getVideoTracks()[0]
    if (currentPeer && videoTrack) {
      const sender = currentPeer.peerConnection.getSenders().find((s: RTCRtpSender) => s.track?.kind === videoTrack.kind)
      sender?.replaceTrack(videoTrack)
    }
    screenStream?.getTracks().forEach((track) => track.stop())
    setScreenSharing(false)
    setScreenStream(null)
  const notify = (msg) => {

  const notify = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 3000)
  }

  const createMediaStreamFake = () => {
    return new MediaStream([createEmptyAudioTrack(), createEmptyVideoTrack({ width: 640, height: 480 })])
  }

  const createEmptyAudioTrack = () => {
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const dst = oscillator.connect(ctx.createMediaStreamDestination())
    oscillator.start()
    const track = dst.stream.getAudioTracks()[0]
    return Object.assign(track, { enabled: false })
  const createEmptyVideoTrack = ({ width, height }) => {

    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const canvas = Object.assign(document.createElement('canvas'), { width, height })
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = "green"
    ctx.fillRect(0, 0, width, height)
    const stream = canvas.captureStream()
    const track = stream.getVideoTracks()[0]
    return Object.assign(track, { enabled: false })
  }

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 text-white p-4 mb-4">
        <h1 className="text-2xl font-bold">WebRTC PeerJs Demo</h1>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Enter Room ID to connect or create</label>
          <Input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
            className="mb-2"
          />
          <div className="space-y-2">
            <Button onClick={createRoom}>Create Room</Button>
            <Button onClick={joinRoom}>Join Room</Button>
            <Button onClick={joinRoomWithoutCamShareScreen}>Join Room and Share screen directly</Button>
            <Button onClick={joinRoomShareVideoAsStream}>Join Room and stream local media</Button>
          </div>
        </div>

        <div>
          {notification && (
            <Alert>
              <AlertTitle>Notification</AlertTitle>
              <AlertDescription>{notification}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {localStream && (
          <div>
            <h2 className="text-xl font-bold mb-2">Local Stream</h2>
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full" />
            <Button onClick={startScreenShare} className="mt-2">
              {screenSharing ? 'Stop Screen Share' : 'Share Screen'}
            </Button>
          </div>
        )}

        {screenStream && (
          <div>
            <h2 className="text-xl font-bold mb-2">Screen Shared Stream</h2>
            <video ref={screenVideoRef} autoPlay muted playsInline className="w-full" />
          </div>
        )}

        {remoteStream && (
          <div>
            <h2 className="text-xl font-bold mb-2">Remote Stream</h2>
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full" />
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-2">Local video from media</h2>
          <h6 className="mb-2">On play stream to remote peer</h6>
          <video
            ref={localMediaRef}
            controls
            muted
            loop
            src="/media/im.abhishekbhardwaj bharmour.mp4"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}