import React from 'react';
import { useAcceptConnectionMutation, useRejectConnectionMutation } from '../../redux/Api/connectUserApiSlice';

const ConnectionProfile = ({user,connectionId}) => {

    const [acceptConnection] = useAcceptConnectionMutation()
    const [rejectConnection] = useRejectConnectionMutation()

    const handleAccept = async() => {
        const res =  await acceptConnection(connectionId)
    }

    const handleReject =async () => {
        const res = await rejectConnection(connectionId)
    }

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        {/* Placeholder for Avatar */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {user?.profile ? (
            <img
              src={user?.profile}
              alt={user?.fullName || 'User Avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          {/* Placeholder for Full Name */}
          <div className="font-semibold text-lg text-gray-800">{user?.fullName}</div>
          {/* Placeholder for Roll Number */}
          <div className="text-sm text-gray-500">{user?.rollNumber}</div>
        </div>
      </div>
      {/* Placeholder for Role */}
      <div className="flex-grow text-center">
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">{user?.role}</span>
      </div>
      <div className="flex space-x-2">
        {/* Placeholder for Accept Button */}
        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={handleAccept}>Accept</button>
        {/* Placeholder for Reject Button */}
        <button className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default ConnectionProfile; 