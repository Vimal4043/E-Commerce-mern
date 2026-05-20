import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddressCard from '../../components/Checkout/AddressCard';

const AddressSections = ({ addresses, selectedAddress, setSelectedAddress }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="font-semibold text-lg mb-4">
                Select Delivery Address
            </h2>

            <div className="space-y-4">
                {addresses.map((addr) => (
                    <AddressCard
                        key={addr._id}
                        address={addr}
                        selected={selectedAddress?._id === addr._id}
                        onSelect={(a) => setSelectedAddress(a)}
                    />
                ))}
            </div>

            <button
                onClick={() => navigate("/add-address", { state: { fromCheckout: true } })}
                className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                + Add New Address
            </button>
        </div>
    )
}

export default AddressSections