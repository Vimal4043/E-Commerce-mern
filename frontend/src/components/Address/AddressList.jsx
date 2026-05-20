import AddressCard from "./AddressCard";

const AddressList = ({ addresses, onAdd, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Addresses</h2>

        <button
          onClick={onAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add Address
        </button>
      </div>

      {/* Empty State */}
      {addresses.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 mb-4">No address added yet</p>

          <button
            onClick={onAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        
        /* Address Cards */
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;