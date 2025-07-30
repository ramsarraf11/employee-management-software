"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganization = exports.updateOrganization = exports.getOrganizationById = exports.getAllOrganizations = exports.createOrganization = void 0;
const organization_serice_1 = require("../services/organization.serice");
const response_handler_1 = require("../utils/response.handler");
const logger_1 = require("../utils/logger");
const express_validator_1 = require("express-validator");
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        response_handler_1.ResponseHandler.failure(req, res, 'Validation failed', 400, new Error(errors.array().map(e => e.msg).join(', ')));
        return;
    }
    try {
        const organization = yield (0, organization_serice_1.createOrganizationService)(req.body);
        response_handler_1.ResponseHandler.success(req, res, 'Organization created successfully', 201, organization);
    }
    catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        logger_1.Logger.instance().log(error.message);
        response_handler_1.ResponseHandler.failure(req, res, 'Error while creating organization', 500, error);
    }
});
exports.createOrganization = createOrganization;
const getAllOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield (0, organization_serice_1.getAllOrganizationsService)();
        response_handler_1.ResponseHandler.success(req, res, 'Organizations retrieved successfully', 200, organizations);
    }
    catch (error) {
        logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
        response_handler_1.ResponseHandler.failure(req, res, 'Error retrieving organizations', 500, error instanceof Error ? error : undefined);
    }
});
exports.getAllOrganizations = getAllOrganizations;
const getOrganizationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        response_handler_1.ResponseHandler.failure(req, res, 'Invalid organization ID', 400);
        return;
    }
    try {
        const organization = yield (0, organization_serice_1.getOrganizationByIdService)(id);
        if (!organization) {
            response_handler_1.ResponseHandler.failure(req, res, 'Organization not found', 404);
            return;
        }
        response_handler_1.ResponseHandler.success(req, res, 'Organization retrieved successfully', 200, organization);
    }
    catch (error) {
        logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
        response_handler_1.ResponseHandler.failure(req, res, 'Error retrieving organization', 500, error instanceof Error ? error : undefined);
    }
});
exports.getOrganizationById = getOrganizationById;
const updateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // fix it
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            response_handler_1.ResponseHandler.failure(req, res, 'Validation failed', 400, new Error(errorMessages.join(', ')));
            return;
        }
        const organization = yield (0, organization_serice_1.updateOrganizationService)(Number(req.params.id), req.body);
        response_handler_1.ResponseHandler.success(req, res, 'Organization updated successfully', 200, organization);
    }
    catch (error) {
        logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
        response_handler_1.ResponseHandler.failure(req, res, 'Error updating organization', 500, error instanceof Error ? error : undefined);
    }
});
exports.updateOrganization = updateOrganization;
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, organization_serice_1.deleteOrganizationService)(Number(req.params.id));
        response_handler_1.ResponseHandler.success(req, res, 'Organization deleted successfully', 200);
    }
    catch (error) {
        logger_1.Logger.instance().log(error instanceof Error ? error.message : String(error));
        response_handler_1.ResponseHandler.failure(req, res, 'Error deleting organization', 500, error instanceof Error ? error : undefined);
    }
});
exports.deleteOrganization = deleteOrganization;
