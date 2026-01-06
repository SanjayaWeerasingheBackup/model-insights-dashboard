/**
 * Backend API Server for Model Testing
 * Runs test scripts and streams output to frontend
 */

import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import { Server } from 'socket.io';
import { createServer } from 'http';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = 3001;
const ML_PROJECT_PATH = '/root/Project/ML-based-Threat-aware-Auto-scaling-in-Kubernetes';

// Map model IDs to test script names
const MODEL_SCRIPT_MAP = {
  'knn': 'test_knn.py',
  'isolation_forest': 'test_isolation_forest.py',
  'ocsvm': 'test_one_class_svm.py',
  'one_class_svm': 'test_one_class_svm.py',
  'gmm': 'test_gmm.py',
  'autoencoder': 'test_autoencoder.py'
};

// Store running processes
const runningProcesses = new Map();

// API endpoint to run test
app.post('/api/run-test', (req, res) => {
  const { version, model } = req.body;

  if (!version || !model) {
    return res.status(400).json({ error: 'Version and model are required' });
  }

  const scriptName = MODEL_SCRIPT_MAP[model];
  if (!scriptName) {
    return res.status(400).json({ error: `Unknown model: ${model}` });
  }

  const testId = `${version}-${model}-${Date.now()}`;
  const scriptPath = path.join(ML_PROJECT_PATH, 'tests', version, scriptName);

  res.json({ testId, message: 'Test started', scriptPath });
});

// WebSocket connection for streaming test output
io.on('connection', (socket) => {
  console.log('[WebSocket] Client connected:', socket.id);

  socket.on('run-test', (data) => {
    console.log('[WebSocket] Received run-test request:', data);
    const { version, model } = data;
    const scriptName = MODEL_SCRIPT_MAP[model];

    if (!scriptName) {
      console.log('[WebSocket] Unknown model:', model);
      socket.emit('error', { message: `Unknown model: ${model}` });
      return;
    }

    const scriptPath = path.join(ML_PROJECT_PATH, 'tests', version, scriptName);
    const testId = `${version}-${model}-${Date.now()}`;

    console.log('[WebSocket] Starting test:', { testId, scriptPath });

    socket.emit('test-started', {
      testId,
      version,
      model,
      scriptPath,
      timestamp: new Date().toISOString()
    });

    // Change to project root and activate venv
    const workDir = ML_PROJECT_PATH;
    const venvPython = path.join(ML_PROJECT_PATH, 'venv', 'bin', 'python3');

    // Spawn process
    console.log('[WebSocket] Spawning process:', { venvPython, scriptPath, workDir });
    const testProcess = spawn(venvPython, [scriptPath], {
      cwd: workDir,
      env: { ...process.env, PYTHONUNBUFFERED: '1' }
    });

    console.log('[WebSocket] Process spawned with PID:', testProcess.pid);
    runningProcesses.set(testId, testProcess);

    // Stream stdout
    testProcess.stdout.on('data', (data) => {
      const output = data.toString();
      socket.emit('test-output', { testId, output, stream: 'stdout' });
    });

    // Stream stderr
    testProcess.stderr.on('data', (data) => {
      const output = data.toString();
      socket.emit('test-output', { testId, output, stream: 'stderr' });
    });

    // Handle process completion
    testProcess.on('close', (code) => {
      socket.emit('test-completed', {
        testId,
        exitCode: code,
        success: code === 0,
        timestamp: new Date().toISOString()
      });
      runningProcesses.delete(testId);
    });

    // Handle errors
    testProcess.on('error', (error) => {
      socket.emit('test-error', {
        testId,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      runningProcesses.delete(testId);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    runningTests: runningProcesses.size,
    mlProjectPath: ML_PROJECT_PATH
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`✓ Test API server running on http://localhost:${PORT}`);
  console.log(`✓ ML Project path: ${ML_PROJECT_PATH}`);
  console.log(`✓ WebSocket ready for test streaming`);
});
