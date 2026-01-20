module.exports = {
  apps: [
    {
      name: "superapps-frontend",
      script: "npm",
      args: "start",
      cwd: "/var/www/superapps/vms-frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};