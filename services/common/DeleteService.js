
exports.DeleteService = async (req, model) => {
    try {
        let data = await model.deleteOne({Id: req.params.id});
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", error: error.message };
    }
};
