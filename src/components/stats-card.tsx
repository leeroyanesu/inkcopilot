interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          {icon}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
