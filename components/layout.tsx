import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-background dark:from-violet-950/30">
      <main className={cn("container mx-auto px-4 py-8 md:py-12", className)}>
        {children}
      </main>
    </div>
  )
}

