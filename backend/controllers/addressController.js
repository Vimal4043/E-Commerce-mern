import Address from "../models/Address.js";

//Save Address
export const saveAddress = async (req, res) => {
    try{
        const userId = req.userId;
        const { addressLine, city, state, pincode } = req.body;

        //check if address already exists
        const existingAddress = await Address.findOne({
            user: userId,
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

        const address = await Address.create(req.body);
        res.json({ message: "Address saved successfully", address });
    } catch (error) {
        res.status(500).json({ message: "Error saving address", error });   
    }
};

//Get Addresses by User ID
export const getAddresses = async (req, res) => {
    try{
        const addresses = await Address.find({
            userId: req.params.userId
        })
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
    }
};

//Update Address
export const updateAddress = async (req, res) => {
    try{
        const addressId = req.params.id;
        const { addressLine, city, state, pincode } = req.body;

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
    try{
        const addressId = req.params.id;
        const deletedAddress = await Address.findByIdAndDelete(addressId);

        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ message: "Address deleted successfully", address: deletedAddress });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address", error });
    }
};
