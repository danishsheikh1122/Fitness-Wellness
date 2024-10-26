"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"
import { Activity, Calendar, CreditCard, Dumbbell, Users, Video } from "lucide-react"

// Sample data for charts
const weeklyActivityData = [
  { day: "Mon", steps: 5000, duration: 30 },
  { day: "Tue", steps: 6000, duration: 45 },
  { day: "Wed", steps: 4500, duration: 25 },
  { day: "Thu", steps: 7000, duration: 60 },
  { day: "Fri", steps: 5500, duration: 40 },
  { day: "Sat", steps: 8000, duration: 75 },
  { day: "Sun", steps: 6500, duration: 50 },
];

const monthlyPointsData = [
  { week: "Week 1", points: 100 },
  { week: "Week 2", points: 150 },
  { week: "Week 3", points: 120 },
  { week: "Week 4", points: 180 },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, Sarah!</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="vr">VR Testing</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Weekly Steps", value: "45,231", progress: 75, icon: <Dumbbell /> },
              { title: "Active Minutes", value: "325 min", progress: 65, icon: <Activity /> },
              { title: "Upcoming Meetings", value: "3", info: "Next: Book Club (Tomorrow)", icon: <Users /> },
              { title: "Weekly Points", value: "550", progress: 87, info: "80 points to next level", icon: <CreditCard /> },
            ].map(({ title, value, progress, info, icon }, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{title}</CardTitle>
                  <span className="h-4 w-4 text-muted-foreground">{icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  {info && <p className="text-xs text-muted-foreground">{info}</p>}
                  {progress !== undefined && <Progress value={progress} className="mt-2" />}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  steps: { label: "Steps", color: "hsl(var(--chart-1))" },
                  duration: { label: "Active Minutes", color: "hsl(var(--chart-2))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="steps" stroke="var(--color-steps)" name="Steps" />
                    <Line yAxisId="right" type="monotone" dataKey="duration" stroke="var(--color-duration)" name="Active Minutes" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exercise Tab */}
        <TabsContent value="exercise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Schedule</CardTitle>
              <CardDescription>Your personalized weekly exercise plan</CardDescription>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { title: "Morning Yoga", duration: "30 minutes", icon: <Dumbbell /> },
                  { title: "Afternoon Walk", duration: "45 minutes", icon: <Activity /> },
                  { title: "Evening Stretching", duration: "15 minutes", icon: <Dumbbell /> },
                ].map(({ title, duration, icon }, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-5 w-5 mr-2">{icon}</span>
                      <span>{title}</span>
                    </div>
                    <span className="text-muted-foreground">{duration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your scheduled virtual meetups</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { title: "Book Club Discussion", time: "Tomorrow, 3:00 PM" },
                  { title: "Yoga for Seniors", time: "Thursday, 10:00 AM" },
                  { title: "Gardening Tips Exchange", time: "Saturday, 2:00 PM" },
                ].map(({ title, time }, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                    <Button size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Join
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { title: "Virtual Coffee Chat", time: "Monday, 11:00 AM" },
                  { title: "Meditation Session", time: "Last Friday, 9:00 AM" },
                ].map(({ title, time }, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                    <Button variant="outline" size="sm">View Recording</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VR Testing Tab */}
        <TabsContent value="vr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VR Experience Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Share your feedback about the VR experiences  participated in:</p>
              <textarea className="w-full border rounded-md p-2" rows="4" placeholder="Write your feedback here..."></textarea>
              <div className="flex justify-end mt-2">
                <Button variant="outline">Submit Feedback</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
