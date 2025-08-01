import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = path.join(__dirname, 'registry.json');

// Simple mock server for registry
export function startMockServer(port = 3333) {
  return new Promise<{ server: http.Server; url: string }>((resolve) => {
    const server = http.createServer((req, res) => {
      const mockRegistry = fs.readFileSync(REGISTRY_PATH, 'utf-8');
      
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      
      // Handle different paths
      if (req.url === '/registry.json' || req.url === '/r/index.json') {
        res.end(mockRegistry);
      } else if (req.url?.includes('components/ui/')) {
        // Extract component name from URL
        const component = req.url.split('/').pop()?.split('.')[0] || '';
        
        // Get the mock component data
        const registry = JSON.parse(mockRegistry);
        if (registry[component]) {
          const file = registry[component].files.find((f: any) => 
            f.name === `${component}.tsx` || f.name === `${component}.jsx`
          );
          
          if (file) {
            res.end(file.content);
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Component file not found' }));
          }
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Component not found' }));
        }
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    });

    server.listen(port, () => {
      console.log(`Mock registry server started at http://localhost:${port}`);
      resolve({
        server,
        url: `http://localhost:${port}`
      });
    });
  });
}

export function stopMockServer(server: http.Server) {
  return new Promise<void>((resolve) => {
    server.close(() => {
      console.log('Mock registry server stopped');
      resolve();
    });
  });
}
