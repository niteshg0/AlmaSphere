import React, { useEffect, useState } from "react";
import { useGetUserConnectionsQuery } from "../redux/Api/connectUserApiSlice";
import ConnectedUserProfile from "../components/ConnectionComponents/ConnectedUserProfile";
import { Loader2 } from "lucide-react";

const ConnectedUsers = () => {
  const [allConnection, setAllConnection] = useState([]);
  const { data, isLoading, refetch } = useGetUserConnectionsQuery();

  useEffect(() => {
    setAllConnection(data);
    refetch();
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            My Connections
          </h2>
          <span className="text-sm text-muted-foreground">
            {allConnection?.length || 0} Connection
            {allConnection?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {allConnection && allConnection.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allConnection.map((connection) => (
              <div key={connection._id}>
                <ConnectedUserProfile user={connection} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No connections yet
            </p>
            <p className="text-sm text-muted-foreground">
              Start connecting with other alumni and students
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectedUsers;
