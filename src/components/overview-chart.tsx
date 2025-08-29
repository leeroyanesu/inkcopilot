import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Tue",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Wed",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Thu",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Fri",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sat",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

interface OverviewProps {
  data?: {
    dates: string[];
    posts: number[];
  }
}

export function Overview({ data }: OverviewProps) {
  if (!data) {
    return null;
  }

  const chartData = data.dates.map((date, index) => ({
    name: date,
    total: data.posts[index]
  }));

  return (
    <Card className="col-span-4">
      <div className="p-6">
        <div className="space-y-1">
          <h3 className="font-semibold">Posts Overview</h3>
          <p className="text-sm text-muted-foreground">
            Number of posts created per day
          </p>
        </div>
        <div className="h-[200px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
