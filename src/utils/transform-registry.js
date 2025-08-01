/**
 * Registry Transformer
 * 
 * This script transforms the existing registry format to the format expected by the Solancn CLI.
 * It converts the object format to an array format and ensures all required fields are present.
 */

const fs = require('fs');
const path = require('path');

/**
 * Transform the registry index from object format to array format
 * @returns {Array} Transformed registry index
 */
function transformRegistry() {
  try {
    // Read the existing registry index
    const registryPath = path.join(__dirname, '../../public/registry/index.json');
    const registryContent = fs.readFileSync(registryPath, 'utf8');
    const registry = JSON.parse(registryContent);
    
    // Transform from object format to array format required by the CLI
    const transformedRegistry = Object.entries(registry).map(([key, value]) => {
      // Ensure required fields are present
      return {
        name: key,
        type: value.type || 'components:ui', 
        description: value.description || `${key} component`,
        dependencies: value.dependencies || [],
        registryDependencies: value.registryDependencies || [],
        files: Array.isArray(value.files) 
          ? value.files.map(file => ({
              name: file.name || `${key}.tsx`,
              content: file.content || '',
              type: file.type || 'components:ui'
            }))
          : [{ name: `${key}.tsx`, content: '', type: 'components:ui' }]
      };
    });
    
    return transformedRegistry;
  } catch (error) {
    console.error('Error transforming registry:', error);
    // Return a minimal registry with basic components if transformation fails
    return [
      {
        name: "button",
        type: "components:ui",
        dependencies: [],
        registryDependencies: [],
        files: [{ name: "button.tsx", content: "", type: "components:ui" }]
      }
    ];
  }
}

/**
 * Write the transformed registry to a file
 */
function writeTransformedRegistry() {
  const transformedRegistry = transformRegistry();
  const outputPath = path.join(__dirname, '../../public/registry/transformed-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(transformedRegistry, null, 2), 'utf8');
  console.log(`Transformed registry written to: ${outputPath}`);
  return transformedRegistry;
}

// Export for use in other modules
module.exports = {
  transformRegistry,
  writeTransformedRegistry
};

// Run the transformation if this script is executed directly
if (require.main === module) {
  writeTransformedRegistry();
}
