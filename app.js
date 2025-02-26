import express from 'express'
import path from 'path';

const app = express()
const FILE_PATH = path.join(__dirname, "word.exe")

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`[+] Request received from ${req.ip} for ${req.url}`);
    next();
  });

  app.get("/word.exe", (req, res) => {
    res.download(FILE_PATH, "ord.exe", (err) => {
      if (err) {
        console.error("[-] Error sending file:", err);
        res.status(500).send("Server error");
      } else {
        console.log(`[+] File sent to ${req.ip}`);
      }
    });
  });  

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`App is listening on port ${PORT}`);
})