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
const fs = require('fs');

// Import the registry transformer
const { transformRegistry } = require('./src/utils/transform-registry');

const app = express();
const PORT = 3333;

// Enable CORS for all requests
app.use(cors());

// Serve transformed index.json for the registry index endpoint
app.get('/registry/index.json', (req, res) => {
  // Transform the registry on each request to get the latest data
  const transformedRegistry = transformRegistry();
  res.json(transformedRegistry);
});

// Serve static files from the public folder for all other registry files
app.use('/registry', express.static(path.join(__dirname, 'public/registry')));

// Handle component detail requests
app.get('/registry/:componentName.json', (req, res) => {
  const componentName = req.params.componentName;
  const registryPath = path.join(__dirname, `public/registry/${componentName}.json`);
  
  // Check if the component file exists
  if (fs.existsSync(registryPath)) {
    const componentData = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    res.json(componentData);
  } else {
    // Return a generic component structure if file doesn't exist
    res.json({
      name: componentName,
      type: "components:ui",
      dependencies: [],
      registryDependencies: [],
      files: [{ name: `${componentName}.tsx`, content: "", type: "components:ui" }]
    });
  }
});

// Handle requests for the root path
app.get('/', (req, res) => {
  res.json({
    name: 'Solancn UI Local Registry',
    description: 'Local registry server for Solancn UI components',
    status: 'running',
    brand: {
      colors: {
        primary: '#9945FF',  // Solana Purple
        secondary: '#14F195', // Solana Green
        background: '#000000' // Solana Black
      }
    }
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
