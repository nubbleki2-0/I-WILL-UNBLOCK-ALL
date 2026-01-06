const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Serve the main UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>System Dashboard</title>
      <style>
        :root {
          --bg-color: #0d001a;
          --primary-purple: #8a2be2;
          --primary-blue: #00bfff;
          --text-color: #ffffff;
          --glass-bg: rgba(255, 255, 255, 0.05);
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Courier New', Courier, monospace;
          background-color: var(--bg-color);
          background: linear-gradient(135deg, #0d001a 0%, #000033 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-color);
          overflow: hidden;
        }

        .container {
          text-align: center;
          background: var(--glass-bg);
          padding: 3rem;
          border-radius: 15px;
          border: 1px solid rgba(138, 43, 226, 0.3);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.2), 
                      0 0 40px rgba(0, 191, 255, 0.1);
          backdrop-filter: blur(10px);
          max-width: 500px;
          width: 90%;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          background: linear-gradient(to right, var(--primary-purple), var(--primary-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 0px 10px rgba(138, 43, 226, 0.5);
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        input[type="text"] {
          width: 100%;
          padding: 15px;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid var(--primary-purple);
          border-radius: 8px;
          color: var(--primary-blue);
          font-family: inherit;
          font-size: 1rem;
          outline: none;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        input[type="text"]:focus {
          border-color: var(--primary-blue);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
        }

        button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(90deg, var(--primary-purple), var(--primary-blue));
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.6);
        }

        button:active {
          transform: translateY(1px);
        }

        .status {
          margin-top: 20px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Access Terminal</h1>
        <form action="/process" method="POST">
          <div class="input-group">
            <input type="text" name="url" placeholder="https://example.com" required autocomplete="off">
          </div>
          <button type="submit">Initialize</button>
        </form>
        <div class="status">System Status: ONLINE</div>
      </div>
    </body>
    </html>
  `);
});

// Handle the form submission
app.post('/process', (req, res) => {
  const targetUrl = req.body.url;
  // This route receives the URL but does not proxy traffic.
  // It simply confirms the input was received.
  res.send(\`
    <body style="background-color: #0d001a; color: #00bfff; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh;">
      <div style="text-align: center;">
        <h2>Input Received</h2>
        <p>Target: \${targetUrl}</p>
        <p><em>Note: Direct backend access is restricted by server-side security protocols.</em></p>
        <br>
        <a href="/" style="color: #8a2be2;">Return to Terminal</a>
      </div>
    </body>
  \`);
});

app.listen(port, () => {
  console.log(\`Server active on port \${port}\`);
});
