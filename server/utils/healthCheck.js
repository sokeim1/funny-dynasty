import mongoose from 'mongoose';

export const checkDatabaseHealth = async () => {
  try {
    // Проверка состояния подключения
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    // Проверка задержки
    const startTime = Date.now();
    await mongoose.connection.db.admin().ping();
    const latency = Date.now() - startTime;

    // Получение статистики
    const stats = await mongoose.connection.db.stats();

    return {
      status: 'ok',
      connection: states[state],
      latency: `${latency}ms`,
      collections: stats.collections,
      documents: stats.objects,
      indexes: stats.indexes,
      dataSize: `${Math.round(stats.dataSize / 1024 / 1024 * 100) / 100}MB`
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
}; 