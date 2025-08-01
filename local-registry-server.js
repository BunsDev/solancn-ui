#!/usr/bin/env node

/**
 * Local Registry Server for Solancn UI Components
 * 
 * This server exposes your local registry files through a simple HTTP server.
 * It allows the Solancn CLI to fetch components from your local registry.
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3333;

// Enable CORS for all requests
app.use(cors());

// Serve static files from the public folder
app.use('/registry', express.static(path.join(__dirname, 'public/registry')));

// Handle requests for the root path
app.get('/', (req, res) => {
    res.json({
        name: 'Solancn UI Local Registry',
        description: 'Local registry server for Solancn UI components',
        status: 'running'
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │   Solancn UI Local Registry Server                │
  │                                                 │
  │   Local registry running at: http://localhost:${PORT}   │
  │                                                 │
  │   Registry URL: http://localhost:${PORT}/registry  │
  │                                                 │
  │   Use this URL with the Solancn CLI               │
  │                                                 │
  └─────────────────────────────────────────────────┘
  `);
});
