import Contact from "../../../models/Contact.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await Contact.create({ name, email, message });
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
