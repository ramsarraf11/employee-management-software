module.exports = {
    apps: [
      {
        name: "employee-management-system-backend",
        script: "dist/server.js",
        instances: "max",
        exec_mode: "cluster",
        env: {
          NODE_ENV: "development",
          PORT: 1000,
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 2000,
        },
      },
    ],
  };