import Contact from "../../../models/Contact.js";

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
