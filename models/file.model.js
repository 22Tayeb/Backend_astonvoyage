import mongoose from 'mongoose';

export const fileSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer,
  });
  
export default  mongoose.model('File', fileSchema);