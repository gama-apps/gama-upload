import express from 'express'
import fileUpload from 'express-fileupload'

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

app.post('/files', (req, res) => {
  console.log(req.files);
  res.send({message: 'uploaded file'})
})

const PORT = process.env.PORT || 20047

app.listen(PORT, () => {
  console.log(`UPLOAD READY AT ${PORT}`);
})