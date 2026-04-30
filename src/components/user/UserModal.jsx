// const UserModal = ({ user, onClose }) => {
//   if (!user) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

//       <div className="bg-[#161212] text-white p-6 rounded-xl w-[600px] max-h-[85vh] overflow-y-auto">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">
//             {user.first_name} {user.last_name}
//           </h2>
//           <button onClick={onClose} className="text-red-400 text-xl">✕</button>
//         </div>

//         {/* STATUS BADGE */}
//         <div className="mb-4">
//           <span
//             className={`px-3 py-1 rounded text-xs ${
//               user.is_active
//                 ? "bg-green-500/20 text-green-400"
//                 : "bg-red-500/20 text-red-400"
//             }`}
//           >
//             {user.is_active ? "Active" : "Inactive"}
//           </span>
//         </div>

//         {/* USER INFO */}
//         <div className="bg-[#1E1919] p-4 rounded mb-4 space-y-2 text-sm">
//           <p><b>Name:</b> {user.first_name} {user.last_name}</p>
//           <p><b>Phone:</b> {user.phone_number}</p>
//           <p><b>Email:</b> {user.email}</p>
//           <p><b>User Type:</b> {user.user_type}</p>
//           <p><b>Language:</b> {user.preferred_language || "N/A"}</p>
//           <p>
//             <b>Created:</b>{" "}
//             {new Date(user.created_at).toLocaleString()}
//           </p>
//         </div>

//         {/* ADDRESS (if available) */}
//         <div className="bg-[#1E1919] p-4 rounded mb-4 text-sm">
//           <h3 className="font-semibold mb-2">Address</h3>

//           {user.address ? (
//             <>
//               <p>{user.address}</p>
//               {/* <p>{user.city}, {user.state}</p>
//               <p>{user.pincode}</p> */}
//             </>
//           ) : (
//             <p className="text-gray-400">No Address Available</p>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserModal;
const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#161212] text-white p-6 rounded-xl w-[600px] max-h-[85vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {user.first_name} {user.last_name}
          </h2>
          <button onClick={onClose} className="text-red-400 text-xl">✕</button>
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <span className={`px-3 py-1 rounded text-xs ${
            user.is_active
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}>
            {user.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* USER INFO */}
        <div className="bg-[#1E1919] p-4 rounded mb-4 space-y-2 text-sm">
          <p><b>Name:</b> {user.first_name} {user.last_name}</p>
          <p><b>Phone:</b> {user.phone_number}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>User Type:</b> {user.user_type}</p>
        </div>

        {/* ADDRESSES LIST */}
        <div className="bg-[#1E1919] p-4 rounded mb-4 text-sm">
          <h3 className="font-semibold mb-3">Addresses</h3>

          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((addr, index) => (
              <div
                key={addr.id}
                className="border-b border-[#2A2A2A] py-2 last:border-none"
              >
                <p className="font-medium">
                  Address {index + 1}
                  {addr.is_default && (
                    <span className="ml-2 text-xs text-green-400">
                      (Default)
                    </span>
                  )}
                </p>

                <p>{addr.address}</p>
                {/* <p>{addr.city}, {addr.state}</p>
                <p>{addr.pincode}</p> */}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No addresses available</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserModal;