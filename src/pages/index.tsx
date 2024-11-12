import React from 'react';
import {
  MoreVertical,
  TrendingUp,
  Users,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../utils/api';
import UserManagement from '../components/UserManagement';
import ContentModeration from '../components/ContentModeration';
import Analytics from '../components/Analytics';

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading)
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 rounded-xl flex items-center justify-center">
        <div className="animate-pulse text-center text-blue-600 text-2xl">
          Loading your data, please wait...
        </div>
      </div>
    );

  if (isError || !data)
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-100 rounded-xl flex items-center justify-center">
        <div className="text-center text-red-600 text-2xl">
          Oops! Something went wrong. Try again later.
        </div>
      </div>
    );

  const { userMetrics, contentMetrics } = data;

  return (
    <div className="min-h-screen bg-[#F4EBE8] p-6 font-['Inter'] rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold bg-black bg-clip-text text-transparent font-days-one">
          Dashboard
        </h1>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-semibold">
              {userMetrics.daily.totalUser}+
            </div>
            <div className="text-blue-100 text-sm">Total Users</div>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-semibold">
              {contentMetrics.daily.totalViews}
            </div>
            <div className="text-purple-100 text-sm">Total Views</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: 'Active Users',
            value: userMetrics.daily.activeUser,
            icon: <Users className="w-6 h-6 text-blue-100" />,
            bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
          },
          {
            title: 'Creators',
            value: userMetrics.daily.creator,
            icon: <Users className="w-6 h-6 text-purple-100" />,
            bg: 'bg-gradient-to-br from-purple-400 to-purple-600',
          },
          {
            title: 'Comments',
            value: contentMetrics.daily.totalComments,
            icon: <MessageCircle className="w-6 h-6 text-pink-100" />,
            bg: 'bg-gradient-to-br from-pink-400 to-pink-600',
          },
          {
            title: 'Shares',
            value: contentMetrics.daily.totalPostShares,
            icon: <Share2 className="w-6 h-6 text-rose-100" />,
            bg: 'bg-gradient-to-br from-rose-400 to-rose-600',
          },
        ].map((metric, index) => (
          <div
            key={index}
            className={`${metric.bg} p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-2">
              {metric.icon}
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-white">{metric.title}</div>
            <div className="text-3xl font-bold text-white mt-2">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="flex justify-between items-center p-8 border-b border-blue-100">
            <h2 className="text-xl text-blue-600 font-days-one">
              User Management
            </h2>
            <MoreVertical className="w-6 h-6 text-blue-400" />
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-200">
            <UserManagement />
          </div>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="flex justify-between items-center p-8 border-b border-purple-100">
            <h2 className="text-xl text-purple-600 font-days-one">
              Content Moderation
            </h2>
            <MoreVertical className="w-6 h-6 text-purple-400" />
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-200">
            <ContentModeration />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="flex justify-between items-center p-8 border-b border-pink-100">
            <h2 className="text-xl font-days-one text-pink-600">
              Analytics Overview
            </h2>
            <MoreVertical className="w-6 h-6 text-pink-400" />
          </div>
          <div className="transform hover:scale-[1.01] transition-all duration-200">
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
}
