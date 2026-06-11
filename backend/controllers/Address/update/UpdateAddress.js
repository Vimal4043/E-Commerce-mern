import Address from "../../../models/Address.js";

export const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const { addressLine, city, state, pincode } = req.body;

        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (!address.userId.equals(userId)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            { addressLine, city, state, pincode },
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: "Error updating address", error });
    }
};
