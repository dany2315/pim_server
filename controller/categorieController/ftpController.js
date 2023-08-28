import PromiseFtp from 'promise-ftp';
import fastcsv from 'fast-csv';
import fs from 'fs';


export const importFileFtp = async (req, res) => {
  const { urlFtp, nomUtilis, pass, nameFile } = req.body;
    
      try {
        const ftp = new PromiseFtp();
        await ftp.connect({ host: urlFtp, user: nomUtilis, password: pass });
    
        const remoteReadStream = await ftp.get(nameFile);
        const localWriteStream = fs.createWriteStream('local.csv');
    
        remoteReadStream.pipe(localWriteStream);
    
        localWriteStream.on('close', async () => {
          await ftp.end();
    
          const csvData = [];
          fs.createReadStream('local.csv')
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', row => { 
              csvData.push(row);
            })
            .on('end', () => {
              fs.unlinkSync('local.csv'); // Delete the local file
              console.log(csvData); // Process the CSV data
              res.status(200).send(csvData);
            });
        });
    
  } catch (error) {
    console.error('FTP Error:', error);
    res.status(500).send("FTP Error.");
  }
};



export default { importFileFtp };
