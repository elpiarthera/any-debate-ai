"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  name: string
  email: string
  bio: string
  avatar: string
}

export function ProfilePanel() {
  const { isMobile } = useDevice()
  const { toast } = useToast()

  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and debate lover",
    avatar: "",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    console.log("[v0] Saving profile:", profile)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully.",
    })
  }

  const updateProfile = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Profile Picture</CardTitle>
          <CardDescription>Update your avatar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size={isMobile ? "lg" : "default"} className="min-h-[44px] gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Upload Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Personal Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Full Name
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => updateProfile("name", e.target.value)}
              className="min-h-[48px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => updateProfile("email", e.target.value)}
              className="min-h-[48px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-base">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => updateProfile("bio", e.target.value)}
              className="min-h-[120px] resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Account Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            size={isMobile ? "lg" : "default"}
            className="min-h-[44px] w-full md:w-auto bg-transparent"
          >
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className={`flex ${isMobile ? "flex-col" : "justify-end"}`}>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size={isMobile ? "lg" : "default"}
          className="min-h-[44px] gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  )
}
