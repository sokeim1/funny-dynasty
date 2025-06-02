import express from 'express';
import { checkDatabaseHealth } from '../utils/healthCheck.js';

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth();
    
    const health = {
      timestamp: new Date().toISOString(),
      status: 'ok',
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version
      },
      database: dbHealth
    };

    if (dbHealth.status === 'error') {
      health.status = 'error';
    }

    res.json(health);
  } catch (error) {
    res.status(500).json({
      timestamp: new Date().toISOString(),
      status: 'error',
      error: error.message
    });
  }
});

export default router; 