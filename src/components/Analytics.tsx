import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../utils/api';
import {
  AreaChart,
  Area,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (
    isError ||
    !data ||
    !data.engagementMetrics ||
    !data.engagementMetrics.daily
  )
    return <p>Error loading data</p>; // Check for data and engagementMetrics

  const dailyData = data.engagementMetrics.daily.chartData;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={dailyData}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="timestamp"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
