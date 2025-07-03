import React from "react";
import { useRemoveConnectionMutation } from "../../redux/Api/connectUserApiSlice";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { UserMinus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ConnectedUserProfile = ({ user }) => {
  const [removeConnection] = useRemoveConnectionMutation();

  const handleRemove = async () => {
    try {
      await removeConnection(user._id).unwrap();
      toast.success("Connection removed successfully");
    } catch (error) {
      console.error("Failed to remove connection:", error);
      toast.error("Failed to remove connection");
    }
  };

  return (
    <Card className="max-w-sm mb-2 border-border bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300">
      <CardContent className="p-2.5">
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/profiles/${user.rollNumber}`}
            className="group flex items-center gap-3 flex-1 min-w-0"
          >
            <Avatar className="h-10 w-10 border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300 flex-shrink-0">
              {user?.profile ? (
                <AvatarImage
                  src={user?.profile}
                  alt={user?.fullName}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  <User className="h-5 w-5 text-primary/60" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-foreground truncate text-sm group-hover:text-primary/90 transition-colors duration-300">
                {user?.fullName}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {user?.rollNumber}
              </span>
              <Badge
                variant="secondary"
                className="mt-0.5 w-fit text-xs px-2 py-0 bg-primary/10 text-primary/90"
              >
                {user?.role}
              </Badge>
            </div>
          </Link>

          <Button
            size="sm"
            variant="destructive"
            className="h-8 px-3 bg-red-500/90 hover:bg-red-600 transition-all duration-300 flex-shrink-0"
            onClick={handleRemove}
          >
            <UserMinus className="h-4 w-4" />
            <span className="sr-only">Remove Connection</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedUserProfile;
