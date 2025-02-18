import React from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const {user} = useSelector(state=>state.auth)

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Personal Details </h3>
      <ul className="space-y-2">
        <li>
          <strong>Full Name : </strong> {user?.data?.fullName}
        </li>
        <li>
          <strong>University Rol Number : </strong> {user?.data?.rollNumber}
        </li>
        <li>
          <strong>Gender : </strong> {user?.data?.gender}
        </li>
        <li>
          <strong>Batch : </strong> {user?.data?.batch}
        </li>
        <li>
          <strong>Email : </strong> {user?.data?.email}
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
