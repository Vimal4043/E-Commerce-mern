import Contact from "../../../models/Contact.js";

export const editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;
        const contact = await Contact.findByIdAndUpdate(id, { name, email, message }, { new: true });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
