"use client";

import { TrendingUp, DollarSign } from "lucide-react";
import {
  Pie,
  PieChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/admin/ui/chart";

const chartData_bar_chart = [
  { month: "October", desktop: 142 },
  { month: "November", desktop: 210 },
  { month: "December", desktop: 325 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
];

const chartData_pie_donut = [
  { browser: "adult", visitors: 275, fill: "var(--color-adult)" },
  { browser: "student", visitors: 200, fill: "var(--color-student)" },
  { browser: "child", visitors: 187, fill: "var(--color-child)" },
  { browser: "senior", visitors: 173, fill: "var(--color-senior)" },
  { browser: "disability", visitors: 90, fill: "var(--color-disability)" },
];

const chartData_line_chart = [
  { month: "October", desktop: 142200 },
  { month: "November", desktop: 211000 },
  { month: "December", desktop: 332500 },
  { month: "January", desktop: 188600 },
  { month: "February", desktop: 130500 },
  { month: "March", desktop: 120850 },
];

const chartData_bar_chart_multiple = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig_bar_chart = {
  desktop: {
    label: "營收",
    color: "hsl(var(--chart-2))",
  },
};

const chartConfig_pie_donut = {
  visitors: {
    label: "Visitors",
  },
  adult: {
    label: "全票",
    color: "hsl(var(--chart-1))",
  },
  student: {
    label: "學生票",
    color: "hsl(var(--chart-2))",
  },
  child: {
    label: "兒童票",
    color: "hsl(var(--chart-3))",
  },
  senior: {
    label: "敬老票",
    color: "hsl(var(--chart-4))",
  },
  disability: {
    label: "愛心票",
    color: "hsl(var(--chart-5))",
  },
};

const chartConfig_line_chart = {
  desktop: {
    label: "營收",
    color: "hsl(var(--chart-2))",
  },
};

const chartConfig_bar_chart_multiple = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export default function Component() {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              總收入
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$120,850</div>
            <p className="text-xs text-gray-400"></p>
          </CardContent>
        </Card>
      </div>

      {/* 圖表區域 */}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-3 bg-gray-800 border-gray-700">
          <CardHeader className="text-gray-200">
            <CardTitle>電影觀看人次</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig_bar_chart}>
              <BarChart
                accessibilityLayer
                data={chartData_bar_chart}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-slate-50"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        <Card className="col-span-3 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">票種分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig_pie_donut}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData_pie_donut}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex items-start gap-2 justify-end">
            <div className="leading-none bg-gray-700 px-4 py-3 rounded-md">
              <div className="grid grid-cols-2 gap-3">
                {chartData_pie_donut.map((item) => (
                  <div 
                    key={item.browser} 
                    className="flex items-center gap-2"
                  >
                    <div 
                      className="w-3 h-3 rounded-sm flex-shrink-0 border-2 border-gray-400" 
                      style={{ 
                        backgroundColor: `hsl(var(--chart-${
                          chartData_pie_donut.findIndex(d => d.browser === item.browser) + 1
                        }))`
                      }}
                    />
                    <span className="text-md text-gray-200">
                      {chartConfig_pie_donut[item.browser]?.label || item.browser}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-3 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">近六個月營收</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig_line_chart}>
              <LineChart
                accessibilityLayer
                data={chartData_line_chart}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="linear"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total revenue for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-3 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">
              去年營收比較
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig_bar_chart_multiple}>
              <BarChart accessibilityLayer data={chartData_bar_chart_multiple}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
