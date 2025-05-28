import React from "react";
import {
  useAcceptConnectionMutation,
  useRejectConnectionMutation,
} from "../../redux/Api/connectUserApiSlice";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Check, X, User } from "lucide-react";

const ConnectionProfile = ({ user, connectionId }) => {
  const [acceptConnection] = useAcceptConnectionMutation();
  const [rejectConnection] = useRejectConnectionMutation();

  const handleAccept = async () => {
    try {
      await acceptConnection(connectionId).unwrap();
    } catch (error) {
      console.error("Failed to accept connection:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectConnection(connectionId).unwrap();
    } catch (error) {
      console.error("Failed to reject connection:", error);
    }
  };

  return (
    <Card className="w-full mb-3 border-border bg-background/50 backdrop-blur-sm">
      <CardContent className="p-3">
        {/* User Info Section */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            {user?.profile ? (
              <AvatarImage src={user.profile} alt={user.fullName} />
            ) : (
              <AvatarFallback className="bg-primary/10">
                <User className="h-5 w-5 text-primary/60" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-foreground truncate">
              {user?.fullName}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.rollNumber}
            </span>
            <Badge variant="secondary" className="mt-1 w-fit text-xs px-2 py-0">
              {user?.role}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button
            size="sm"
            variant="success"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8"
            onClick={handleAccept}
          >
            <Check className="h-4 w-4 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleReject}
            className="flex-1 h-8"
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionProfile;
