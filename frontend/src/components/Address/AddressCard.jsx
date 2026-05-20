// import { Pencil, Trash2 } from "lucide-react";

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition">
      
      {/* Top Row: Name + Actions */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{address.fullName}</p>
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(address)}
            className="text-blue-500 hover:text-blue-700"
          >
            {/* <Pencil size={18} /> */}
            ✏️
          </button>

          <button
            onClick={() => onDelete(address._id)}
            className="text-red-500 hover:text-red-700"
          >
            {/* <Trash2 size={18} /> */}
            🗑️
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="mt-3 text-gray-700 text-sm">
        <p>{address.addressLine}</p>
        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>
      </div>

    </div>
  );
};

export default AddressCard;