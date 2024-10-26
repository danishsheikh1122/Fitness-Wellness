// app/camera/page.jsx
"use client"; // This is a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CameraPage = () => {
    const router = useRouter();
    const roomId = new URLSearchParams(window.location.search).get("roomId");
    let localVideoRef = null;
    let remoteVideoRef = null;

    useEffect(() => {
        const peer = new Peer(roomId);
        let localStream;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStream = stream;
                localVideoRef.srcObject = localStream;
                localVideoRef.play();

                peer.on("call", (call) => {
                    call.answer(localStream); // Answer the call with your local stream
                    call.on("stream", (remoteStream) => {
                        remoteVideoRef.srcObject = remoteStream;
                        remoteVideoRef.play();
                    });
                });
            })
            .catch((err) => console.log(err));

        return () => {
            // Cleanup code here if needed
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            peer.destroy();
        };
    }, [roomId]);

    return (
        <div className="container">
            <h1 className="mt-5">Room ID: {roomId}</h1>
            <div className="row">
                <div className="col">
                    <h2>Local Stream</h2>
                    <video ref={(ref) => localVideoRef = ref} controls muted className="w-100"></video>
                </div>
                <div className="col">
                    <h2>Remote Stream</h2>
                    <video ref={(ref) => remoteVideoRef = ref} controls className="w-100"></video>
                </div>
            </div>
        </div>
    );
};

export default CameraPage;
