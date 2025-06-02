export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:BhQCjOILatzKbeKXZsnuZmGNAdonJzSA@interchange.proxy.rlwy.net:12384';
export const PORT = process.env.PORT || 5001;

export const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};
