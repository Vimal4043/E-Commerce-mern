import Address from "../../../models/Address.js";

export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
    }
};
