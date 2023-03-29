import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://lucaslmir:GVIf1IOhVoA2a8J9@cluster0.4typgyo.mongodb.net/alura-node"
);

let db = mongoose.connection

export default db;