import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../utils/api';

const ContentModeration = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data || !data.contentMetrics)
    return <p>Error loading data</p>;

  const { daily } = data.contentMetrics;
  return (
    <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
          <span className="text-sm text-gray-500 font-medium">Views</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.totalViews}
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
          <span className="text-sm text-gray-500 font-medium">Shares</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.totalPostShares}
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
          <span className="text-sm text-gray-500 font-medium">Comments</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.totalComments}
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-pink-500">
          <span className="text-sm text-gray-500 font-medium">Post Exits</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.totalPostExitCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModeration;
