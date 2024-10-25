"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Pause, Play, RotateCcw, Volume2 } from 'lucide-react'

// Dynamically import A-Frame components
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('aframe-react').then(mod => mod.Scene), { ssr: false })
const Entity = dynamic(() => import('aframe-react').then(mod => mod.Entity), { ssr: false })

const yogaPoses = [
  { name: "Mountain Pose", duration: 60, instruction: "Stand tall with feet together, arms at sides." },
  { name: "Tree Pose", duration: 30, instruction: "Balance on one leg, other foot on inner thigh, hands in prayer." },
  { name: "Warrior II", duration: 45, instruction: "Lunge with front knee bent, arms outstretched." },
  { name: "Downward Dog", duration: 60, instruction: "Form an inverted V-shape, hands and feet on the ground." },
  { name: "Child's Pose", duration: 90, instruction: "Kneel and sit back on heels, stretch arms forward." },
]

export default function VRYogaRoom() {
  const [isVRMode, setIsVRMode] = useState(false)
  const [currentPose, setCurrentPose] = useState(yogaPoses[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(currentPose.duration)
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    let interval;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsPlaying(false)
      setTimeRemaining(currentPose.duration)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timeRemaining, currentPose])

  const handlePoseChange = (poseName) => {
    const newPose = yogaPoses.find(pose => pose.name === poseName) || yogaPoses[0]
    setCurrentPose(newPose)
    setTimeRemaining(newPose.duration)
    setIsPlaying(false)
  }

  const togglePlay = () => setIsPlaying(!isPlaying)

  const resetTimer = () => {
    setIsPlaying(false)
    setTimeRemaining(currentPose.duration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">VR Yoga Room</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Yoga Environment</CardTitle>
            <CardDescription>Immerse yourself in a peaceful virtual yoga studio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {isVRMode ? (
                <Scene>
                  <Entity primitive="a-sky" src="/textures/yoga-studio.jpg" />
                  <Entity primitive="a-plane" position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" />
                  <Entity primitive="a-text" value={currentPose.name} position="0 2 -3" color="#000" width="6" align="center" />
                  <Entity primitive="a-text" value={currentPose.instruction} position="0 1.5 -3" color="#000" width="4" align="center" />
                  <Entity primitive="a-text" value={formatTime(timeRemaining)} position="0 1 -3" color="#000" width="6" align="center" />
                </Scene>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Button onClick={() => setIsVRMode(true)}>Enter VR Mode</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yoga Controls</CardTitle>
            <CardDescription>Customize your virtual yoga experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pose-select">Select Yoga Pose</Label>
              <Select onValueChange={handlePoseChange} value={currentPose.name}>
                <SelectTrigger id="pose-select">
                  <SelectValue placeholder="Select a pose" />
                </SelectTrigger>
                <SelectContent>
                  {yogaPoses.map((pose) => (
                    <SelectItem key={pose.name} value={pose.name}>
                      {pose.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timer Controls</Label>
              <div className="flex space-x-2">
                <Button onClick={togglePlay} variant="outline">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button onClick={resetTimer} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <div className="flex-grow text-center flex items-center justify-center text-2xl font-bold">
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume-control">Background Music Volume</Label>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Slider
                  id="volume-control"
                  min={0}
                  max={100}
                  step={1}
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                />
                <span>{volume}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current Pose Instructions</Label>
              <p className="text-sm text-muted-foreground">{currentPose.instruction}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
