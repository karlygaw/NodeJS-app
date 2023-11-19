// File System
const fs = require('fs')
const path = require('path')

// fs.mkdir(path.join(__dirname, 'test'), (err) => {
//   if (err) {
//     throw err
//   }
//
//   console.log('Папка создана')
// })

const filePath = path.join(__dirname, 'test', 'text.txt')

// fs.writeFile(filePath, 'Hello NodeJS!', err => {
//   if (err) {
//     throw err
//   }
//
//   console.log('Файл создан')
//
//   fs.appendFile(filePath, '\nHello Again!', err => {
//     if (err) {
//       throw err
//     }
//
//     console.log('Файл создан')
//   })
// })


// fs.readFile(filePath, 'utf-8', (err, content) => {
//   if (err) {
//     throw err
//   }

//   console.log(content)

//   // const data = Buffer.from(content)
//   // console.log('Content: ', data.toString())
// })


// // Функция для асинхронного чтения директории
// function readDirectory(dirPath) {
//   fs.readdir(dirPath, (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }

//     console.log(`Контент директории ${dirPath}:`);
//     files.forEach((file) => {
//       const filePath = path.join(dirPath, file);
//       const isDirectory = fs.statSync(filePath).isDirectory();
//       console.log(`${isDirectory ? 'Директория' : 'Файл'}: ${file}`);
//     });
//   });
// }

// // Пример использования
// // const directoryPath = 'demo'; // Замените на реальный путь
// const directoryPath = 'demo';
// readDirectory(directoryPath);


function deleteFileOrDirectory(itemPath) {
  fs.stat(itemPath, (err, stats) => {
    if (err) {
      console.error('Error checking file/directory:', err);
      return;
    }

    if (stats.isFile()) {
      // Удаление файла
      fs.unlink(itemPath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log(`File deleted: ${itemPath}`);
        }
      });
    } else if (stats.isDirectory()) {
      // Удаление директории
      fs.readdir(itemPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }

        // Рекурсивное удаление файлов и поддиректорий
        files.forEach((file) => {
          const filePath = path.join(itemPath, file);
          deleteFileOrDirectory(filePath);
        });

        // После удаления файлов и поддиректорий удаляем саму директорию
        fs.rmdir(itemPath, (err) => {
          if (err) {
            console.error('Error deleting directory:', err);
          } else {
            console.log(`Directory deleted: ${itemPath}`);
          }
        });
      });
    }
  });
}

// Осында функцияны шақырамыз
const itemPath = 'demo/jai.js';
deleteFileOrDirectory(itemPath);

