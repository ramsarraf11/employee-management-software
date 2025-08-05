'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async ({ context }) => {
    const { User, Role } = context.sequelize.models; // Access User and Role models
    if (!User || !Role) {
      throw new Error('User or Role model is not defined. Ensure they are registered in Sequelize.');
    }

    // Fetch role IDs
    const adminRole = await Role.findOne({ where: { roleName: 'School Admin' } });
    const userRole = await Role.findOne({ where: { roleName: 'User' } });

    // Log a warning if roles are not found, but continue
    if (!adminRole) {
      console.warn('Warning: Admin role not found. Skipping admin user creation.');
    }
    if (!userRole) {
      console.warn('Warning: User role not found. Skipping regular user creation.');
    }

    // Seed users only if roles are found
    const usersToCreate = [];

    if (adminRole) {
      const adminPassword = 'securepassword2'; // Plain password for admin
      const hashedAdminPassword = await bcrypt.hash(adminPassword, 10); // Hash the password

      console.log(`Admin Password: ${adminPassword}`); // Log the plain password

      usersToCreate.push({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedAdminPassword,
        is_active: true,
        roleId: adminRole.id,
        username: 'johndoe', // Optional: Add username if needed
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (userRole) {
      const userPassword = 'password2'; // Plain password for user
      const hashedUserPassword = await bcrypt.hash(userPassword, 10); // Hash the password

      console.log(`User Password: ${userPassword}`); // Log the plain password

      usersToCreate.push({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: hashedUserPassword,
        is_active: true,
        roleId: userRole.id, // Assign User role
        username: 'janesmith', // Optional: Add username if needed
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (usersToCreate.length > 0) {
      await User.bulkCreate(usersToCreate);
      console.log('Users seeded successfully.');
    } else {
      console.warn('No users were created because no roles were found.');
    }
  },

  down: async ({ context }) => {
    const { User } = context.sequelize.models; // Access the User model
    if (!User) {
      throw new Error('User model is not defined. Ensure it is registered in Sequelize.');
    }

    await User.destroy({ where: {}, truncate: true }); // Deletes all rows in the users table
  },
};