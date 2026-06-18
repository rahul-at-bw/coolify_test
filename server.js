const express = require('express');
const os = require('os');

// Initialize the Express application
const app = express();

// Use the PORT environment variable if available, otherwise fallback to 3000
// Coolify will automatically inject the PORT environment variable
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------
// Route: Home ('/')
// Description: Displays a simple HTML page with server info
// ---------------------------------------------------------
app.get('/', (req, res) => {
  // Gather server information
  const serverTime = new Date().toISOString();
  const hostname = os.hostname();
  const environment = process.env.NODE_ENV || 'development';

  // Construct a simple, beginner-friendly HTML response
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Coolify Test App</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.6;
          color: #333;
          background-color: #f9fafb;
        }
        .container {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 { color: #2563eb; margin-top: 0; }
        .success { color: #16a34a; font-weight: bold; font-size: 1.25rem; }
        .info-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.75rem 1.5rem;
          margin-top: 2rem;
          background-color: #f3f4f6;
          padding: 1.5rem;
          border-radius: 6px;
        }
        .label { font-weight: bold; color: #4b5563; }
        .endpoints {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        a { color: #2563eb; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Coolify Test App 🚀</h1>
        <p class="success">Deployment Successful 🎉</p>
        
        <div class="info-grid">
          <div class="label">Server Time:</div>
          <div>\${serverTime}</div>
          
          <div class="label">Hostname:</div>
          <div>\${hostname}</div>
          
          <div class="label">Environment:</div>
          <div>\${environment}</div>
        </div>

        <div class="endpoints">
          <h3>Available API Endpoints:</h3>
          <ul>
            <li><a href="/health">/health</a> - Simple health check</li>
            <li><a href="/info">/info</a> - Detailed server information</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send the HTML content
  res.send(html);
});

// ---------------------------------------------------------
// Route: Health Check ('/health')
// Description: Returns a simple JSON response for monitoring
// ---------------------------------------------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// ---------------------------------------------------------
// Route: System Info ('/info')
// Description: Returns detailed server and runtime information
// ---------------------------------------------------------
app.get('/info', (req, res) => {
  // Calculate memory usage in Megabytes
  const memoryUsage = process.memoryUsage();
  
  res.json({
    node_version: process.version,
    platform: process.platform,
    uptime: Math.round(process.uptime()) + ' seconds',
    memory_usage: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB'
    }
  });
});

// Start listening for incoming requests
app.listen(PORT, () => {
  console.log(\`🚀 Server is running on port \${PORT}\`);
  console.log(\`Environment: \${process.env.NODE_ENV || 'development'}\`);
});
