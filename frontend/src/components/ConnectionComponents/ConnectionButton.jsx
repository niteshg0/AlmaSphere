import React, { useEffect, useState } from "react";
import {
  useCreateConnectionMutation,
  useGetConnectionStatusQuery,
  useRemoveConnectionMutation,
} from "../../redux/Api/connectUserApiSlice.js";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const ConnectionButton = ({ userId, connectionsCount }) => {
  const [buttonStatus, setButtonStatus] = useState("connect");
  const [isLoading, setIsLoading] = useState(false);

  const [createConnection] = useCreateConnectionMutation();
  const [removeConnection] = useRemoveConnectionMutation();
  const { data: statusData, refetch: refetchStatus } =
    useGetConnectionStatusQuery(userId);

  const navigate = useNavigate();

  useEffect(() => {
    if (statusData) {
      setButtonStatus(statusData.status || "connect");
    }
  }, [statusData]);

  const handleConnectionAction = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (buttonStatus === "connect") {
        await createConnection(userId).unwrap();
      } else if (buttonStatus === "received") {
        navigate("/network");
      } else {
        await removeConnection(userId).unwrap();
      }
      await refetchStatus();
    } catch (error) {
      console.error("Connection action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyles = () => {
    const baseStyles =
      "min-w-[120px] h-[40px] rounded-full border-2 font-medium flex items-center justify-center gap-2 transition-all duration-300";

    switch (buttonStatus) {
      case "connected":
        return `${baseStyles} border-green-500 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/50`;
      case "pending":
        return `${baseStyles} border-gray-400 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-75`;
      case "received":
        return `${baseStyles} border-primary bg-primary/10 text-primary hover:bg-primary/20`;
      default:
        return `${baseStyles} border-primary text-primary hover:bg-primary/10`;
    }
  };

  const getButtonText = () => {
    switch (buttonStatus) {
      case "connected":
        return `Connected (${connectionsCount || 0})`;
      case "pending":
        return "Request Sent";
      case "received":
        return "Accept Request";
      default:
        return "Connect";
    }
  };

  return (
    <button
      className={getButtonStyles()}
      onClick={handleConnectionAction}
      disabled={isLoading || buttonStatus === "pending"}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        getButtonText()
      )}
    </button>
  );
};

export default ConnectionButton;
