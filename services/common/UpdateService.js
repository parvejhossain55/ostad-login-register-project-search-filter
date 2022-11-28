exports.UpdateService = async (find, update, model) => {
    try {
        const data = await model.aggregate([{ $match: find }, { $set: update }]);
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", error: error.message };
    }
};
