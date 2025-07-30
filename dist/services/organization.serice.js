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
exports.getOrganizationByEmailService = exports.deleteOrganizationService = exports.updateOrganizationService = exports.getOrganizationByIdService = exports.getAllOrganizationsService = exports.createOrganizationService = void 0;
const organization_repository_1 = require("../repositories/organization.repository");
const createOrganizationService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield (0, exports.getOrganizationByEmailService)(data.email);
    if (existing) {
        throw new Error('Organization already exists');
    }
    const result = yield (0, organization_repository_1.createOrganization)(data);
    if (!result) {
        throw new Error('Failed to create organization');
    }
    return result;
});
exports.createOrganizationService = createOrganizationService;
const getAllOrganizationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, organization_repository_1.getAllOrganizations)();
});
exports.getAllOrganizationsService = getAllOrganizationsService;
const getOrganizationByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, organization_repository_1.getOrganizationById)(id);
});
exports.getOrganizationByIdService = getOrganizationByIdService;
const updateOrganizationService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, organization_repository_1.updateOrganization)(id, data);
});
exports.updateOrganizationService = updateOrganizationService;
const deleteOrganizationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, organization_repository_1.deleteOrganization)(id);
});
exports.deleteOrganizationService = deleteOrganizationService;
// get by email
const getOrganizationByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, organization_repository_1.getOrganizationByEmail)(email);
});
exports.getOrganizationByEmailService = getOrganizationByEmailService;
