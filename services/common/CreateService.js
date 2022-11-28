exports.CreateService = async (body, model) => {
    try {
        let data = await model.create(body);
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", error: error.message };
    }
};