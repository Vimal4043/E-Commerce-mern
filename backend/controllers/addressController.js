import Address from "../models/Address.js";

//Save Address
export const saveAddress = async (req, res) => {
    try{
        const userId = req.userId;
        const { adressLine, city, state, pincode } = req.body;

        //check if address already exists
        const existingAddress = await Address.findOne({
            user: userId,
            adressLine,
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