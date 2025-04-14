import type { TimelineEvent } from "@/types"

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-muted before:h-full ml-4">
      {events.map((event, index) => {
        // Create zigzag effect by alternating left and right positioning
        const isEven = index % 2 === 0
        const zigzagClass = isEven ? "pl-8 pr-0" : "pl-8 md:pl-0 md:pr-8 md:ml-auto md:mr-8"

        return (
          <div
            key={index}
            className={`relative ${zigzagClass} pb-8 max-w-md transition-all duration-300 hover:translate-y-[-5px]`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: "0.5s",
              animationFillMode: "both",
            }}
          >
            <div
              className={`absolute ${isEven ? "left-0" : "left-0 md:right-0 md:left-auto"} top-2 w-8 flex items-center justify-center`}
            >
              <div className="h-3 w-3 rounded-full bg-primary"></div>
            </div>
            <div className="text-sm text-muted-foreground">{event.time}</div>
            <div className="bg-muted p-3 rounded-md mt-1 hover:bg-muted/80 transition-colors">
              <div className="font-medium">{event.title}</div>
              <p className="text-sm mt-1">{event.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
