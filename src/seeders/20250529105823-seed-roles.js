'use strict';

module.exports = {
  up: async ({ context }) => {
    const { Role } = context.sequelize.models;
    if (!Role) {
      throw new Error('Role model is not defined. Ensure it is registered in Sequelize.');
    }

    await Role.bulkCreate([
      { roleName: 'System Admin', description: 'Manages the entire Ecosystem', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'School Admin', description: 'Manages the entire school system', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'Teacher', description: 'Manages classes and students', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'Student', description: 'Represents a student enrolled in the school', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'Accounts', description: 'Handles school finances and fees', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'Transport', description: 'Manages school transportation', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'Librarian', description: 'Manages the school library', createdAt: new Date(), updatedAt: new Date() },
      { roleName: 'System Developer', description: 'Responsible for system development and maintenance', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async ({ context }) => {
    const { Role } = context.sequelize.models;
    if (!Role) {
      throw new Error('Role model is not defined. Ensure it is registered in Sequelize.');
    }

    await Role.destroy({ where: {}, truncate: true });
  },
};