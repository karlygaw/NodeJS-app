// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// const server = http.createServer((req, res) => {
//   // if (req.url === '/') {
//   //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
//   //     if (err) {
//   //       throw err
//   //     }
//   //
//   //     res.writeHead(200, {
//   //       'Content-Type': 'text/html'
//   //     })
//   //     res.end(data)
//   //   })
//   // } else if (req.url === '/contact') {
//   //   fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, data) => {
//   //     if (err) {
//   //       throw err
//   //     }
//   //
//   //     res.writeHead(200, {
//   //       'Content-Type': 'text/html'
//   //     })
//   //     res.end(data)
//   //   })
//   // }

//   let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
//   const ext = path.extname(filePath)
//   let contentType = 'text/html'

//   switch (ext) {
//     case '.css':
//       contentType = 'text/css'
//       break
//     case '.js':
//       contentType = 'text/javascript'
//       break
//     default:
//       contentType = 'text/html'
//   }

//   if (!ext) {
//     filePath += '.html'
//   }

//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
//         if (err) {
//           res.writeHead(500)
//           res.end('Error')
//         } else {
//           res.writeHead(200, {
//             'Content-Type': 'text/html'
//           })
//           res.end(data)
//         }
//       })
//     } else {
//       res.writeHead(200, {
//         'Content-Type': contentType
//       })
//       res.end(content)
//     }
//   })
// })

// const PORT = process.env.PORT || 3000

// server.listen(PORT, () => {
//   console.log(`Server has been started on ${PORT}...`)
// })


const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Handle other routes as before...
  } else if (req.url === '/directory') {
    const directoryPath = 'demo'; // Replace with your actual directory path

    // Read the directory asynchronously
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading directory');
        return;
      }

      // Filter out directories
      const directories = files.filter(file => fs.statSync(path.join(directoryPath, file)).isDirectory());

      // Send the directories as JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ directories }));
    });
  } else {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      default:
        contentType = 'text/html';
    }

    if (!ext) {
      filePath += '.html';
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Error');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html',
            });
            res.end(data);
          }
        });
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
        });
        res.end(content);
      }
    });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});

