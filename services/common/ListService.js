exports.ListService = async (req, model, SearchArray) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const search = req.query?.search;

        let skip = (page - 1) * limit;

        let data;

        if (search !== undefined) {
            let SearchQuery = { $or: SearchArray };

            data = await model.aggregate([
                { $match: SearchQuery },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skip }, { $limit: limit }],
                    },
                },
            ]);
        } else {
            data = await model.aggregate([
                { $match: SearchQuery },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skip }, { $limit: limit }],
                    },
                },
            ]);
        }
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", info: error.message };
    }
};
