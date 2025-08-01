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
      // Ensure required fields are present in the format the CLI expects
      return {
        name: key,
        display: value.display || key,
        description: value.description || `${key} component`,
        dependencies: value.dependencies || [],
        registryDependencies: value.registryDependencies || [],
        files: value.files && Array.isArray(value.files) 
          ? value.files.map(file => {
              return {
                name: file.name || `${key}.tsx`,
                content: file.content || '',
                type: file.type || 'component'
              };
            })
          : [
              { 
                name: `${key}.tsx`, 
                content: '', 
                type: 'component'
              }
            ]
      };
    });
    
    // Try to read an example component file to get the right format
    try {
      const examplePath = path.join(__dirname, '../../public/registry/button.json');
      if (fs.existsSync(examplePath)) {
        const exampleContent = fs.readFileSync(examplePath, 'utf8');
        const exampleComponent = JSON.parse(exampleContent);
        
        // Update transformed registry based on the example component format
        const updatedRegistry = transformedRegistry.map(component => {
          return {
            name: component.name,
            display: exampleComponent.display ? component.display : undefined,
            description: component.description,
            dependencies: component.dependencies || exampleComponent.dependencies || [],
            registryDependencies: component.registryDependencies || exampleComponent.registryDependencies || [],
            files: component.files.map(file => ({
              name: file.name,
              content: file.content || '',
              type: exampleComponent.files && exampleComponent.files[0] ? exampleComponent.files[0].type : 'component'
            }))
          };
        });
        
        return updatedRegistry;
      }
    } catch (exampleError) {
      // Ignore errors reading example component
    }
    
    return transformedRegistry;
  } catch (error) {
    console.error('Error transforming registry:', error);
    // Return a minimal registry with basic components if transformation fails
    return [
      {
        name: "button",
        display: "Button",
        description: "A button component that can be used to trigger an action.",
        dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
        registryDependencies: [],
        files: [
          { 
            name: "button.tsx", 
            content: "", 
            type: "component" 
          }
        ]
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
