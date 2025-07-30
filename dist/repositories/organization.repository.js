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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizationByEmail = exports.getUsersByOrganization = exports.deleteOrganization = exports.updateOrganization = exports.getOrganizationById = exports.getAllOrganizations = exports.createOrganization = void 0;
const organization_model_1 = __importDefault(require("../models/organization.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const info_generation_1 = require("../utils/info.generation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("../utils/logger");
// import { sendEmail } from '../utils/email.service';
// import { generateOnboardingEmail } from '../templates/onboarding-email.template';
/**
 * Create a new organization and its admin user.
 * @param data - Partial organization data
 * @returns The created organization and admin credentials
 */
const createOrganization = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield ((_a = organization_model_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
    try {
        const organization = yield organization_model_1.default.create(data, { transaction });
        const username = (0, info_generation_1.generateUsername)(data.orgName || 'organization');
        const rawPassword = (0, info_generation_1.generatePassword)();
        const hashedPassword = yield bcrypt_1.default.hash(rawPassword, 10);
        logger_1.Logger.instance().log(`Credentials for organization ${organization.orgName}: Username: ${username}, Password: ${rawPassword}`);
        yield user_model_1.default.create({
            name: data.ownerName,
            email: data.email,
            password: hashedPassword,
            username: username,
            roleId: 2, // for school admins
            is_active: true,
            organizationId: organization.id, // Associate the admin with the organization
        }, { transaction });
        // const emailBody = generateOnboardingEmail(organization.orgName, username, rawPassword);
        // if (data.email) {
        //   await sendEmail(data.email, `Welcome to ${organization.orgName}!`, emailBody);
        // } else {
        //   throw new Error('Email is required to send onboarding email.');
        // }
        yield (transaction === null || transaction === void 0 ? void 0 : transaction.commit());
        // Return the organization and the raw password (optional, for admin use)
        return { organization, adminCredentials: { username, password: rawPassword } };
    }
    catch (error) {
        yield (transaction === null || transaction === void 0 ? void 0 : transaction.rollback());
        console.error('Error creating organization:', error);
        throw error;
    }
});
exports.createOrganization = createOrganization;
/**
 * Get all organizations.
 * @returns A list of all organizations
 */
const getAllOrganizations = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield organization_model_1.default.findAll({
        include: [user_model_1.default], // Include associated users
    });
});
exports.getAllOrganizations = getAllOrganizations;
/**
 * Get an organization by its ID.
 * @param id - Organization ID
 * @returns The organization if found
 */
const getOrganizationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield organization_model_1.default.findByPk(id, {
        include: [user_model_1.default], // Include associated users
    });
});
exports.getOrganizationById = getOrganizationById;
/**
 * Update an organization by its ID.
 * @param id - Organization ID
 * @param data - Partial organization data to update
 * @returns The updated organization
 */
const updateOrganization = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.default.findByPk(id);
    if (!organization) {
        throw new Error('Organization not found');
    }
    return yield organization.update(data);
});
exports.updateOrganization = updateOrganization;
/**
 * Delete an organization by its ID.
 * @param id - Organization ID
 * @returns The result of the deletion
 */
const deleteOrganization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.default.findByPk(id);
    if (!organization) {
        throw new Error('Organization not found');
    }
    return yield organization.destroy();
});
exports.deleteOrganization = deleteOrganization;
/**
 * Get all users associated with a specific organization.
 * @param organizationId - Organization ID
 * @returns A list of users belonging to the organization
 */
const getUsersByOrganization = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findAll({
        where: { organizationId },
    });
});
exports.getUsersByOrganization = getUsersByOrganization;
// get by email
const getOrganizationByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield organization_model_1.default.findOne({
        where: { email },
    });
});
exports.getOrganizationByEmail = getOrganizationByEmail;
/**
 * Get an organization by its email.
 * @param email - Organization email
 * @returns The organization if found
 */ 
