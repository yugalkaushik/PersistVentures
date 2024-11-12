import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../utils/api';

const UserManagement = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading data</p>;

  const { daily } = data.userMetrics;

  return (
    <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
          <span className="text-sm text-gray-500 font-medium">Total Users</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.totalUser}
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
          <span className="text-sm text-gray-500 font-medium">Referrals</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.totalReferral}
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
          <span className="text-sm text-gray-500 font-medium">
            Active Users
          </span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.activeUser}
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-pink-500">
          <span className="text-sm text-gray-500 font-medium">Creators</span>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {daily.creator}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
