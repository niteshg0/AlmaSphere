import React, { useEffect, useState } from "react";
import {
  useCreateConnectionMutation,
  useGetConnectionStatusQuery,
  useRemoveConnectionMutation,
} from "../../redux/Api/connectUserApiSlice.js";
import { useNavigate } from "react-router";

const ConnectionButton = ({ userId }) => {
  const [buttonStatus, setButtonStatus] = useState("connect");
  const [isLoading, setIsLoading] = useState(false);

  const [createConnection] = useCreateConnectionMutation();
  const [removeConnection] = useRemoveConnectionMutation();
  const { data: statusData, refetch: refetchStatus } = useGetConnectionStatusQuery(userId);

  const navigate = useNavigate()
  // Update button status when statusData changes
  useEffect(() => {
    if (statusData) {
      setButtonStatus(statusData.status || "connect");
      console.log(statusData)
    }
  }, [statusData]);

  const handleConnectionAction = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (buttonStatus === "connect") {
        await createConnection(userId).unwrap();
      }else if(buttonStatus === "received"){
        navigate("/network")
      }
       else {
        await removeConnection(userId).unwrap();
      }
      // Refresh the status after successful action
      await refetchStatus();
    } catch (error) {
      console.error("Connection action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    switch (buttonStatus) {
      case "connected":
        return "Disconnect";
      case "pending":
        return "Pending";
      case "received":
        return "Accept Request";
      default:
        return "Connect";
    }
  };

  return (
    <button
      className={`min-w-[100px] h-[40px] rounded-full border-2 ${
        buttonStatus === "connected" 
          ? "border-green-500 bg-green-50" 
          : buttonStatus === "pending"
          ? "border-gray-400 bg-gray-100"
          : "border-[#2dc0ff] hover:bg-blue-50"
      } transition-colors`}
      onClick={handleConnectionAction}
      disabled={isLoading || buttonStatus== "pending"}
    >
      {isLoading ? (
        <span className="animate-pulse">Processing...</span>
      ) : (
        getButtonText()
      )}
    </button>
  );
};

export default ConnectionButton;