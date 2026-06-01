import Address from "../../../models/Address.js";

export const saveAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressLine, city, state, pincode } = req.body;

        const existingAddress = await Address.findOne({
            userId: userId,
            addressLine,
            city,
            state,
            pincode,
        });

        if (existingAddress) {
            return res.status(400).json({ message: "Address already exists" });
        }

        const address = await Address.create({ ...req.body, userId });
        res.json({ message: "Address saved successfully", address });
    } catch (error) {
        res.status(500).json({ message: "Error saving address", error });
    }
};
