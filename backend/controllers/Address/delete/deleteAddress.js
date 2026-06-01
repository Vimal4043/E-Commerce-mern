import Address from "../../../models/Address.js";

export const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;

        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (!address.userId.equals(userId)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const deletedAddress = await Address.findByIdAndDelete(addressId);

        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ message: "Address deleted successfully", address: deletedAddress });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address", error });
    }
};
