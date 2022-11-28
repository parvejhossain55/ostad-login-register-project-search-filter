
exports.FindService = async (find, model) => {
    try {
        let data = await model.aggregate([
            { $match: find },
        ]);
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", info: error.message };
    }
};

exports.FindByProject = async (match, project, model) => {
    try {
        let data = await model.aggregate([
            { $match: match },
            { $project: project },
        ]);
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", info: error.message };
    }
};
