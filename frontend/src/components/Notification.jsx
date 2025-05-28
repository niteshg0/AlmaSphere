const Notification = () => {
  const [open, setOpen] = useState(false);
  const [connections, setConnections] = useState([]);
  const { data: connectionData, refetch: refetchStatus } =
    useGetConnectionRequestsQuery();

  useEffect(() => {
    if (connectionData) setConnections(connectionData);
    refetchStatus();
  }, [connectionData]);

  const handleClose = () => setOpen(false);

  if (!connectionData) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {connectionData > 0 ? (
            <MdNotificationAdd className="scale-150 mt-3 ml-4 text-indigo-700 dark:text-indigo-300" />
          ) : (
            <IoIosNotifications className="scale-150 mt-3 ml-4 text-indigo-700 dark:text-indigo-300" />
          )}
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Connection Requests</SheetTitle>
          </SheetHeader>
          <div className="mt-5">
            {connections
              ? connections.map((c) => (
                  <div key={c._id} onClick={handleClose}>
                    <Link to={`/profiles/${c.senderUserId.rollNumber}`}>
                      <ConnectionProfile
                        user={c.senderUserId}
                        connectionId={c._id}
                        onAction={handleClose}
                      />
                    </Link>
                  </div>
                ))
              : "No request found"}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
