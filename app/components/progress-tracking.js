"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, BarChart, Calendar, Clock, Heart, TrendingUp, Walk } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the progress chart
const progressData = [
  { date: "Week 1", steps: 3000, heartRate: 75 },
  { date: "Week 2", steps: 3500, heartRate: 74 },
  { date: "Week 3", steps: 4000, heartRate: 73 },
  { date: "Week 4", steps: 4500, heartRate: 72 },
  { date: "Week 5", steps: 5000, heartRate: 71 },
  { date: "Week 6", steps: 5500, heartRate: 70 },
]

export default function ProgressTrackingAndExercise() {
  const [activity, setActivity] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Activity logged:", { activity, duration })
    // Reset form
    setActivity("")
    setDuration("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Progress Tracking & Exercise</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2" /> Log Your Activity
            </CardTitle>
            <CardDescription>Keep track of your daily exercises</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="activity">Activity Type</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Select an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="stretching">Stretching</SelectItem>
                    <SelectItem value="gardening">Gardening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <Button type="submit">Log Activity</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2" /> Your Progress
            </CardTitle>
            <CardDescription>View your activity trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                steps: {
                  label: "Daily Steps",
                  color: "hsl(var(--chart-1))",
                },
                heartRate: {
                  label: "Avg. Heart Rate",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="steps" stroke="var(--color-steps)" name="Daily Steps" />
                  <Line yAxisId="right" type="monotone" dataKey="heartRate" stroke="var(--color-heartRate)" name="Avg. Heart Rate" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Walk className="mr-2" /> Daily Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5,500</p>
            <p className="text-sm text-muted-foreground">Goal: 6,000 steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2" /> Average Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">70 bpm</p>
            <p className="text-sm text-muted-foreground">Resting rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Active Minutes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">45 min</p>
            <p className="text-sm text-muted-foreground">Goal: 30 min/day</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2" /> Weekly Exercise Plan
          </CardTitle>
          <CardDescription>Your personalized exercise schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Monday", "Wednesday", "Friday"].map((day) => (
              <div key={day} className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{day}</h3>
                <ul className="list-disc list-inside">
                  <li>15 min gentle stretching</li>
                  <li>20 min walking</li>
                  <li>10 min balance exercises</li>
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Remember to consult with your doctor before starting any new exercise routine.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" /> Your Achievements
          </CardTitle>
          <CardDescription>Celebrate your progress!</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full p-1 mr-2">
                <Walk className="h-4 w-4" />
              </span>
              Reached 5,000 steps in a day
            </li>
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full p-1 mr-2">
                <Activity className="h-4 w-4" />
              </span>
              Completed 3 yoga sessions this week
            </li>
            <li className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full p-1 mr-2">
                <Heart className="h-4 w-4" />
              </span>
              Lowered resting heart rate by 5 bpm
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
