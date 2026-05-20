import Address from "../models/Address.js";

//Save Address
export const saveAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressLine, city, state, pincode } = req.body;

        //check if address already exists
        const existingAddress = await Address.findOne({
            userId: userId,
            addressLine,
            city,
            state,
            pincode,
        });

        if (existingAddress) {
            return res.status(400).json({
                message: "Address already exists",
            });
        }

        const address = await Address.create({ ...req.body, userId });
        res.json({ message: "Address saved successfully", address });
    } catch (error) {
        res.status(500).json({ message: "Error saving address", error });
    }
};

//Get Addresses by User ID
export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
    }
};

//Update Address
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

//Delete Address
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
