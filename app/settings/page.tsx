"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfilePanel } from "@/components/settings/profile-panel"
import { PreferencesPanel } from "@/components/settings/preferences-panel"

export default function SettingsPage() {
  const { isMobile } = useDevice()

  return (
    <DashboardLayout title="Settings" subtitle="Manage your profile and preferences">
      <div className="p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList
            className={`
            grid w-full grid-cols-2 
            ${isMobile ? "h-[44px]" : "h-auto"}
          `}
          >
            <TabsTrigger value="profile" className="min-h-[44px] text-base">
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="min-h-[44px] text-base">
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4 md:mt-6">
            <ProfilePanel />
          </TabsContent>

          <TabsContent value="preferences" className="mt-4 md:mt-6">
            <PreferencesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
