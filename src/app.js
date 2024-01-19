import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile, getFiles, getFile, downloadFile, getFileUrl } from './s3.js'


//Iniciando la aplicación
const app = express();

//middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'upload'
}));
 
// app.get('/', (req, res) => {
//   res.json({message: 'gama-upload'})
// })

app.get('/files', async (req, res) => {
  const result = await getFiles()
  res.json(result.Contents)
})

app.get('/files/:fileName', async (req, res) => {
  const result = await getFileUrl(req.params.fileName);
  res.json({
    url: result
  })
})

app.get('/downloadFile/:fileName', async (req, res) => {
  const result = await downloadFile(req.params.fileName);
  res.json({message: 'archivo descargado'})
})

app.post('/files', async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.json({ result })
})

//carpeta publica
app.use(express.static('downloads'))

const PORT = process.env.PORT || 20047

app.listen(PORT, () => {
  console.log(`UPLOAD READY AT ${PORT}`);
})