// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    console.log(`✅ MongoDB conectado com sucesso! Banco: ${db.name}`);
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
