import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile } from './s3.js'


//Iniciando la aplicación
const app = express();

//middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'upload'
}));
 
app.get('/', (req, res) => {
  res.json({message: 'gama-upload'})
})

app.post('/files',async (req, res) => {
  const result = await uploadFile(req.files.file);
  //res.send({message: 'uploaded file'})
  res.json({ result })
})

const PORT = process.env.PORT || 20047

app.listen(PORT, () => {
  console.log(`UPLOAD READY AT ${PORT}`);
})