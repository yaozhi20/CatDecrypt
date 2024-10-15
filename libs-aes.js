const fs= require("fs");
const crypto = require('crypto');
const yaml = require('yamljs');
const path = require('path');

var key = 'a password';  // 32 bit
var iv = 'a password iv';//16 bit
var fileinfo_set = [];

function decrypt_file_main(fileinfo, key, iv ){

    fileinfo_set = InitFileInfo(fileinfo);
    for (var index in fileinfo_set){
        var fileinfo = fileinfo_set[index];
        // console.log(fileinfo[0],fileinfo[1]);
        var srcfile = fileinfo[0];
        var dstfile = fileinfo[1];
        decrypt_file(srcfile, dstfile, key, iv);
    }

};


function InitFileInfo(fileinfo){
    // file为文件所在路径
    // var data = yaml.parse(fs.readFileSync('./app.yml').toString());
    var data = yaml.parse(fs.readFileSync(fileinfo).toString());
    var data2 = data['files_set']
    var data3 = data2['files'];
    var base_dir = data2['base_dir'];

    var files=data3;
    var fileinfo_set = [];

    for (var key in files){
        
        var file = files[key];
        var srcfile = base_dir + file;
        

        var tmp1 = path.basename(file,'.jenc');
        
        var dstfile = base_dir + tmp1;
        
        fileinfo_set.push([srcfile,dstfile]);
    }

    return fileinfo_set;
}

function decrypt_file(srcfile,dstfile,key,iv){
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    const input = fs.createReadStream(srcfile);
    const output = fs.createWriteStream(dstfile);
    
    input.pipe(decipher).pipe(output);
} 

function getResult(){

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const flag = 0;
    const file='file'
    // const dstfile=srcfile+'.jenc'

    // 加密
    if (flag){
        const srcfile=file
        const dstfile=srcfile+'.jenc'
        const input = fs.createReadStream(srcfile);
        const output = fs.createWriteStream(dstfile);

        input.pipe(cipher).pipe(output);
    }
    // end

    // 解密
    else{
        const srcfile=file+'.jenc'
        const dstfile=file+'.p'
        const input = fs.createReadStream(srcfile);
        const output = fs.createWriteStream(dstfile);

        input.pipe(decipher).pipe(output);
    }
    // end
}

function main(){
    for (var index in fileinfo_set){
        var fileinfo = fileinfo_set[index];
        console.log(fileinfo[0],fileinfo[1]);
        var srcfile = fileinfo[0];
        var dstfile = fileinfo[1];
        decrypt_file(srcfile,dstfile);
    }

};

// (async () => {
// const readline = require('node:readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// await rl.question(`input key:`, name => {       
//     key = name;
//     rl.question(`input iv:`, name => {       
//         iv = name;
//         console.log(`key: ${key}, iv: ${iv}`);
//         fileinfo_set = InitFileInfo();
//         main();
//         rl.close();
//     });
// });

// })();

module.exports = { decrypt_file_main };