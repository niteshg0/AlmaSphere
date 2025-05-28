import { useGetConnectionRequestsQuery } from "@/redux/Api/connectUserApiSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosNotifications } from "react-icons/io";
import { MdNotificationAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import ConnectionProfile from "../components/ConnectionComponents/ConnectionProfile";


const Notification = () => {
  const [open, setOpen] = useState(false);
  const [connections, setConnections] = useState([]);
  const { data: connectionData, refetch: refetchStatus } =
    useGetConnectionRequestsQuery();

  useEffect(() => {
    if (connectionData) setConnections(connectionData);
    refetchStatus();
  }, [connectionData]);


  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key={"right"} open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">{side}</Button> */}
          {connectionData > 0 ? (
            <MdNotificationAdd className="scale-150 mt-3 ml-4 text-indigo-700 dark:text-indigo-300" />
          ) : (
            <IoIosNotifications className="scale-150 mt-3 ml-4 text-indigo-700 dark:text-indigo-300" />
          )}
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Connection Requests</SheetTitle>
            {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
                </SheetDescription> */}
          </SheetHeader>
          <div className="mt-5">
            {connections?.length != 0 ? (
              connections.map((c) => (
                <div key={c._id}>
                  <ConnectionProfile
                    user={c.senderUserId}
                    connectionId={c._id}
                    setOpen={setOpen}
                  />
                </div>
              ))
            ) : (
              <SheetDescription>
                There is no connection request.
              </SheetDescription>
            )}
          </div>

          {/* <SheetFooter> */}
          {/* <SheetClose asChild> */}
          {/* <Button type="submit">Save changes</Button> */}
          {/* </SheetClose> */}
          {/* </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Notification;
