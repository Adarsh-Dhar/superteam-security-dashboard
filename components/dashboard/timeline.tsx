import type { TimelineEvent } from "@/types"

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-muted before:h-full ml-4">
      {events.map((event, index) => (
        <div key={index} className="relative pl-8 pb-8">
          <div className="absolute left-0 top-2 w-8 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
          </div>
          <div className="text-sm text-muted-foreground">{event.time}</div>
          <div className="bg-muted p-3 rounded-md mt-1">
            <div className="font-medium">{event.title}</div>
            <p className="text-sm mt-1">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
