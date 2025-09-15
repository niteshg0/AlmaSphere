import { useState } from "react";

const ProfileAvatar = ({ userp }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Avatar */}
<div
  onClick={() => setOpen(true)}
  className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 
             border-2 border-indigo-300 dark:border-indigo-700 
             flex items-center justify-center overflow-hidden 
             cursor-pointer"
>
  {userp?.profile_image ? (
    <img
      src={userp.profile_image}
      alt={userp?.fullName || "Profile"}
      className="w-full h-full object-cover"
    />
  ) : (
    <svg
      className="w-16 h-16 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 
           7.5 5.015 7.5 7.5 9.515 12 12 12zm-7.5 
           9a7.5 7.5 0 0115 0H4.5z"
        clipRule="evenodd"
      />
    </svg>
  )}
</div>

{/* Modal for full image */}
{open && userp?.profile_image && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    onClick={() => setOpen(false)}
  >
    <div
      className="relative p-2 bg-white rounded-lg max-w-md w-full flex justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={userp.profile_image}
        alt={userp?.fullName || "Profile"}
        className="rounded-full w-64 h-64 object-cover"
      />
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-black text-xl font-bold"
      >
        ×
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default ProfileAvatar;
