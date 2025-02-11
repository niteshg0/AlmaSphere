import React from "react";

const ProfileList = () => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Security Settings</h3>
      <ul className="space-y-2">
        <li>
          <strong>Password Last Changed:</strong> July 15, 2024
        </li>
        <li>
          <strong>Two-Factor Authentication:</strong> Enabled
        </li>
        <li>
          <strong>Security Questions Set:</strong> Yes
        </li>
        <li>
          <strong>Login Notifications:</strong> Enabled
        </li>
        <li>
          <strong>Connected Devices:</strong> 3 Devices
        </li>
        <li>
          <strong>Recent Account Activity:</strong> No Suspicious Activity
          Detected
        </li>
      </ul>
    </div>
  );
};

export default ProfileList;
