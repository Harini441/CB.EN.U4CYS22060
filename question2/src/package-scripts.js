
// This is a helper file to update the scripts in package.json
// We'll use npm scripts to run both the client and server
module.exports = {
  scripts: {
    "dev:client": "vite",
    "dev:server": "nodemon server.js",
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "start": "node server.js"
  }
};
