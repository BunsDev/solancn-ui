import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path for server-side file access
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * API endpoint to fetch file contents
 * This allows client components to access file content without direct fs access
 */
export async function GET(request: NextRequest) {
  try {
    // Get the file path from the query parameters
    const filePath = request.nextUrl.searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    // For security reasons, limit file access to specific directories
    // Ensure the path is within the project's scope
    const rootDir = path.join(__dirname, '../../../../');
    const absolutePath = path.resolve(rootDir, filePath);
    
    // Security check: Prevent path traversal attacks
    if (!absolutePath.startsWith(rootDir)) {
      return NextResponse.json(
        { error: 'Access denied: Requested file is outside of allowed directories' }, 
        { status: 403 }
      );
    }
    
    // Read the file
    const content = await fs.readFile(absolutePath, 'utf-8');
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
