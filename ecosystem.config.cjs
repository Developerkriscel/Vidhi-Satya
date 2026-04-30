module.exports = {
  apps: [
    {
      name: "vidhi-satya",
      cwd: __dirname,
      script: "npm",
      args: "run start:hostinger",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      max_memory_restart: "512M",
      time: true
    }
  ]
};
