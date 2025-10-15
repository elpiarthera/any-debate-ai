"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Preferences {
  theme: "light" | "dark" | "system"
  defaultModel: string
  autoSave: boolean
  language: string
  notifications: boolean
  soundEffects: boolean
}

export function PreferencesPanel() {
  const { isMobile } = useDevice()
  const { toast } = useToast()

  const [preferences, setPreferences] = useState<Preferences>({
    theme: "dark",
    defaultModel: "gpt-4",
    autoSave: true,
    language: "en",
    notifications: true,
    soundEffects: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    console.log("[v0] Saving preferences:", preferences)
    // Mock save - in real app would call API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Appearance</CardTitle>
          <CardDescription>Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-base">
              Theme
            </Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => updatePreference("theme", value as Preferences["theme"])}
            >
              <SelectTrigger id="theme" className="min-h-[48px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Model */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">AI Model</CardTitle>
          <CardDescription>Choose your default AI model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="model" className="text-base">
              Default Model
            </Label>
            <Select value={preferences.defaultModel} onValueChange={(value) => updatePreference("defaultModel", value)}>
              <SelectTrigger id="model" className="min-h-[48px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3">Claude 3</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Behavior */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Behavior</CardTitle>
          <CardDescription>Control app behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between min-h-[44px]">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save" className="text-base">
                Auto-save
              </Label>
              <p className="text-sm text-muted-foreground">Automatically save your work</p>
            </div>
            <Switch
              id="auto-save"
              checked={preferences.autoSave}
              onCheckedChange={(checked) => updatePreference("autoSave", checked)}
              className="min-h-[44px] min-w-[44px]"
            />
          </div>

          <div className="flex items-center justify-between min-h-[44px]">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-base">
                Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive app notifications</p>
            </div>
            <Switch
              id="notifications"
              checked={preferences.notifications}
              onCheckedChange={(checked) => updatePreference("notifications", checked)}
              className="min-h-[44px] min-w-[44px]"
            />
          </div>

          <div className="flex items-center justify-between min-h-[44px]">
            <div className="space-y-0.5">
              <Label htmlFor="sound" className="text-base">
                Sound Effects
              </Label>
              <p className="text-sm text-muted-foreground">Play sounds for actions</p>
            </div>
            <Switch
              id="sound"
              checked={preferences.soundEffects}
              onCheckedChange={(checked) => updatePreference("soundEffects", checked)}
              className="min-h-[44px] min-w-[44px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Language</CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-base">
              Language
            </Label>
            <Select value={preferences.language} onValueChange={(value) => updatePreference("language", value)}>
              <SelectTrigger id="language" className="min-h-[48px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
