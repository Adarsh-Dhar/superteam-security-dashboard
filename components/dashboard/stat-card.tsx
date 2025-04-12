import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StatCardProps {
  title: string
  value: string
  isCritical?: boolean
  showProgress?: boolean
  progressValue?: number
}

export function StatCard({ title, value, isCritical = false, showProgress = false, progressValue = 0 }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
        <p className={`text-2xl font-semibold ${isCritical ? "text-destructive" : "text-foreground"}`}>{value}</p>
        {showProgress && (
          <div className="mt-2">
            <Progress value={progressValue} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
