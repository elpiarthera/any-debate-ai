"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import type { ReactNode } from "react"

interface AdaptiveModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
  description?: string
}

export function AdaptiveModal({ isOpen, onClose, title, children, className, description }: AdaptiveModalProps) {
  const { isMobile } = useDevice()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent
          className={`bg-background border-border ${className}`}
          aria-describedby={description ? undefined : "drawer-no-description"}
        >
          <DrawerHeader>
            <DrawerTitle className="text-foreground">{title}</DrawerTitle>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            {!description && (
              <span id="drawer-no-description" className="sr-only">
                No additional description
              </span>
            )}
          </DrawerHeader>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-4 pb-4">{children}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`bg-background border-border text-foreground max-w-4xl max-h-[90vh] overflow-y-auto ${className}`}
        aria-describedby={description ? undefined : "dialog-no-description"}
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {!description && (
            <span id="dialog-no-description" className="sr-only">
              No additional description
            </span>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
