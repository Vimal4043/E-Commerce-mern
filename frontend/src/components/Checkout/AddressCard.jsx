import React from 'react';

const AddressCard = ({ address, selected, onSelect }) => {
  return (
    <label
      className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition shadow-sm w-full
        ${selected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-400 hover:shadow-md'}`}
      onClick={() => onSelect && onSelect(address)}
    >
      <input
        type="radio"
        name="address"
        checked={Boolean(selected)}
        onChange={() => onSelect && onSelect(address)}
        className="mt-1"
      />

      <div className="space-y-1">
        <p className="font-semibold">{address.fullName}</p>

        <p className="text-sm text-gray-600">
          {address.addressLine}, {address.city}, {address.state} - {address.pincode}
        </p>

        <p className="text-sm text-gray-600">📞 {address.phone}</p>

        {selected && (
          <span className="text-xs text-blue-600 font-medium">Selected</span>
        )}
      </div>
    </label>
  );
};

export default AddressCard;