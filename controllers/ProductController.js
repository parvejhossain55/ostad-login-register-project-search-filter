const Product = require("../models/ProductModel");
const { ObjectId } = require("mongoose").Types;
const { CreateService } = require("../services/common/CreateService");
const { UpdateService } = require("../services/common/UpdateService");
const { FindService } = require("../services/common/FindService");
const { DeleteService } = require("../services/common/DeleteService");
const { ListService } = require("../services/common/ListService");

exports.AddProduct = async (req, res) => {
    try {
        const result = await CreateService(req.body, Product);
        if (result.status !== "fail") {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

exports.UpdateProduct = async (req, res) => {
    try {
        const find = { _id: ObjectId(req.params.id) };
        const update = req.body;
        const result = await UpdateService(find, update, Product);
        if (result.status !== "fail" && result.value !== null) {
            res.status(200).json({
                ...result,
                msg: "Product Successfully Updated",
            });
        } else {
            res.status(500).json({ ...result, msg: "Invalid Id No" });
        }
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

exports.GetProductById = async (req, res) => {
    try {
        const result = await FindService(
            { _id: ObjectId(req.params.id) },
            Product
        );
        if (result.status !== "fail") {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

exports.GetAllProduct = async (req, res) => {
    try {
        let checkRegex = { $regex: req.query.search, $options: "i" };

        let searchArray = [
            { name: checkRegex },
            { description: checkRegex },
            { color: checkRegex },
            { category: checkRegex },
            { brand: checkRegex },
            { price: checkRegex },
        ];

        let project = { $project: { updatedAt: 0, createdAt: 0 } };

        const result = await ListService(req, Product, searchArray, project);

        if (result.status !== "fail") {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

exports.DeleteProduct = async (req, res) => {
    try {
        const result = await DeleteService(req, Product);
        if (result.status !== "fail") {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};
