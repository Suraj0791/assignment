'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Gamepad, Gift, Laptop, Phone, Plane, Bike, Pizza, PiggyBank, ChevronRight, ChevronLeft, Plus, Users, DollarSign, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from "@/components/ui/switch"
import { cn } from '@/lib/utils'
import type { Goal, GoalType, Group } from '@/types/goal'

const GOALS: Goal[] = [
  { type: 'iphone', amount: 999, title: 'iPhone', icon: 'Phone', description: 'Latest iPhone model' },
  { type: 'laptop', amount: 1299, title: 'Laptop', icon: 'Laptop', description: 'High-performance laptop' },
  { type: 'camera', amount: 799, title: 'Camera', icon: 'Camera', description: 'Digital camera' },
  { type: 'bike', amount: 599, title: 'Bike', icon: 'Bike', description: 'Mountain bike' },
  { type: 'trip', amount: 1500, title: 'Trip', icon: 'Plane', description: 'Dream vacation' },
  { type: 'food', amount: 200, title: 'Food', icon: 'Pizza', description: 'Monthly food budget' },
  { type: 'savings', amount: 1000, title: 'Savings', icon: 'PiggyBank', description: 'Emergency fund' },
  { type: 'ps5', amount: 499, title: 'PS5', icon: 'Gamepad', description: 'Gaming console' },
]

const FAKE_GROUPS: (Group & { targetAmount: number })[] = [
  { name: "Tech Enthusiasts", members: 5, goal: "Latest Gadgets", targetAmount: 2500 },
  { name: "Globe Trotters", members: 8, goal: "World Tour", targetAmount: 8000 },
  { name: "Fitness Fanatics", members: 6, goal: "Home Gym Equipment", targetAmount: 3000 },
  { name: "Book Lovers", members: 4, goal: "Personal Library", targetAmount: 1600 },
];

const getIcon = (iconName: string) => {
  const icons = {
    Phone,
    Laptop,
    Camera,
    Bike,
    Plane,
    Pizza,
    PiggyBank,
    Gamepad,
  }
  return icons[iconName as keyof typeof icons]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
}

export function GoalSetupForm() {
  const [step, setStep] = React.useState(1)
  const [selectedGoal, setSelectedGoal] = React.useState<Goal | null>(null)
  const [group, setGroup] = React.useState<Group>({
    name: '',
    members: [''],
    targetAmount: 0,
    contributionPerMember: 0,
  })
  const [duration, setDuration] = React.useState(12) // months
  const [payOnTime, setPayOnTime] = React.useState(false)

  const progress = ((step - 1) / 3) * 100

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setGroup(prev => ({
      ...prev,
      targetAmount: goal.amount,
      contributionPerMember: goal.amount / (prev.members.length || 1) / duration,
    }))
  }

  const handleAddMember = () => {
    setGroup(prev => {
      const newMembers = [...prev.members, '']
      return {
        ...prev,
        members: newMembers,
        contributionPerMember: prev.targetAmount / newMembers.length / duration,
      }
    })
  }

  const handleRemoveMember = (index: number) => {
    setGroup(prev => {
      const newMembers = prev.members.filter((_, i) => i !== index);
      return {
        ...prev,
        members: newMembers,
        contributionPerMember: prev.targetAmount / newMembers.length / duration,
      };
    });
  };

  const handleMemberChange = (index: number, value: string) => {
    setGroup(prev => {
      const newMembers = [...prev.members];
      newMembers[index] = value;
      return {
        ...prev,
        members: newMembers,
      };
    });
  };

  const handleDurationChange = (newDuration: number[]) => {
    const duration = newDuration[0]
    setDuration(duration)
    setGroup(prev => ({
      ...prev,
      contributionPerMember: prev.targetAmount / prev.members.length / duration,
    }))
  }

  const handleContributionChange = (newContribution: number) => {
    setGroup(prev => ({
      ...prev,
      contributionPerMember: newContribution,
      targetAmount: newContribution * prev.members.length * duration,
    }))
  }

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4))
  }

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleJoinFakeGroup = (fakeGroup: typeof FAKE_GROUPS[0]) => {
    setGroup(prev => ({
      ...prev,
      name: fakeGroup.name,
      members: Array(fakeGroup.members).fill(''),
      targetAmount: fakeGroup.targetAmount,
      contributionPerMember: fakeGroup.targetAmount / fakeGroup.members / duration,
    }));
    setStep(3);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="border-2 overflow-hidden">
        <CardHeader className="space-y-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="text-3xl font-bold">Dream Saver</CardTitle>
          <CardDescription className="text-white/80">Set up your savings goal and achieve your dreams together</CardDescription>
          <Progress 
            value={progress} 
            className="h-2 bg-white/20 [&>div]:bg-white" 
          />
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              {...fadeInUp}
              className="space-y-8"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Choose Your Dream</h2>
                    <p className="text-muted-foreground">What are you saving up for?</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {GOALS.map((goal) => {
                      const Icon = getIcon(goal.icon)
                      return (
                        <motion.div
                          key={goal.type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant={selectedGoal?.type === goal.type ? "default" : "outline"}
                            className={cn(
                              "h-full w-full flex-col gap-4 p-6",
                              selectedGoal?.type === goal.type && "border-2 border-primary shadow-lg"
                            )}
                            onClick={() => handleGoalSelect(goal)}
                          >
                            <Icon className="h-12 w-12" />
                            <div className="space-y-1 text-center">
                              <div className="font-medium">{goal.title}</div>
                              <div className="text-sm text-muted-foreground">${goal.amount}</div>
                            </div>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Create Your Dream Team</h2>
                    <p className="text-muted-foreground">Who's joining you on this savings journey?</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        placeholder="Enter a catchy name for your group"
                        value={group.name}
                        onChange={(e) =>
                          setGroup((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Dream Team Members</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddMember}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Dreamer
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {group.members.map((member, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={member}
                              onChange={(e) => handleMemberChange(index, e.target.value)}
                              placeholder={`Dreamer ${index + 1}`}
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleRemoveMember(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <h3 className="text-lg font-semibold">Or join an existing group:</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {FAKE_GROUPS.map((fakeGroup, index) => (
                          <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardHeader>
                              <CardTitle>{fakeGroup.name}</CardTitle>
                              <CardDescription>
                                {fakeGroup.members} members · Goal: {fakeGroup.goal}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button 
                                variant="outline" 
                                className="w-full" 
                                onClick={() => handleJoinFakeGroup(fakeGroup)}
                              >
                                Join Group
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Plan Your Dream Journey</h2>
                    <p className="text-muted-foreground">Let's break down the savings plan</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dream Goal</CardTitle>
                        <CardDescription>Total amount to save</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">
                          ${group.targetAmount.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dream Duration</CardTitle>
                        <CardDescription>How long to save?</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Slider
                          min={1}
                          max={36}
                          step={1}
                          value={[duration]}
                          onValueChange={handleDurationChange}
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>1 month</span>
                          <span className="text-lg font-semibold">{duration} months</span>
                          <span>3 years</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="sm:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">Individual Contribution</CardTitle>
                        <CardDescription>Monthly savings per dreamer</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            <Input
                              type="number"
                              value={group.contributionPerMember.toFixed(2)}
                              onChange={(e) => handleContributionChange(parseFloat(e.target.value))}
                              className="text-2xl font-bold"
                            />
                            <span className="text-base font-normal text-muted-foreground">/ month</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Each member saves ${(group.contributionPerMember * duration).toFixed(2)} in total
                          </p>
                          <div className="flex items-center gap-2">
                            <Switch id="pay-on-time" checked={payOnTime} onCheckedChange={setPayOnTime} />
                            <Label htmlFor="pay-on-time">Pay on time reminder</Label>
                          </div>
                          {payOnTime && (
                            <p className="text-sm text-muted-foreground">
                              We'll send reminders to ensure everyone pays on time!
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Dream Rewards</h2>
                    <p className="text-muted-foreground">Exciting perks await as you reach your goal!</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-6">
                        <Gift className="h-16 w-16 text-white" />
                      </div>
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">Unlock Dream Achievements!</h3>
                      <p className="text-muted-foreground">
                        Stay on track with your payments to earn special rewards and bonuses
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Milestone Bonuses</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1">
                            <li>25% progress: Early Bird Badge</li>
                            <li>50% progress: Halfway Hero Trophy</li>
                            <li>75% progress: Determination Star</li>
                            <li>100% progress: Dream Achiever Medal</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Streak Rewards</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1">
                            <li>3 months: Consistency Coin</li>
                            <li>6 months: Saver's Delight Package</li>
                            <li>9 months: Golden Piggy Bank</li>
                            <li>12 months: Dream Master Title</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                className={cn("ml-auto")}
                onClick={handleNext}
                disabled={
                  (step === 1 && !selectedGoal) ||
                  (step === 2 && (!group.name || !group.members[0]))
                }
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="ml-auto" onClick={() => console.log('Dream plan completed:', { selectedGoal, group, duration })}>
                Start Your Dream Journey
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

