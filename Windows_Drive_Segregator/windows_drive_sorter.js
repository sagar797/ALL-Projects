// Note :
// finds all the files and folders present 
// inside the directory and 
// sorts them out on the basis of file format

let fs = require("fs-extra");
let path = require("path");
const moveFile = require('move-file');
var source_array = [];
var destination_array = [];

var source = process.argv[2];
let destination = path.join(source,"Sorted_Files");
if (!fs.existsSync(destination)){
    fs.mkdirSync(destination, { recursive: true });
   }
   console.log(destination);
// var destination = process.argv[3];
var root = {};

get_the_work_done(source,destination,root);

async function get_the_work_done(source,destination,root) {
await untreefy(source,destination,root);
// makes and writes in the file dir_structure.json , all the actual file locations
await fs.writeFileSync(path.join(destination,"dir_structure.json"),JSON.stringify(root));
console.log("All files found \n \n \n");
await move_files();
console.log(`No of files found : ${source_array.length}`);
console.log(`No of files moved : ${destination_array.length}`);
}

async function move_files(){
    console.log("inside move_file funcion");
    let idx = 0;
    while(idx<source_array.length)
    {
        let source_path = source_array[idx];
        let destination_path = destination_array[idx];
        console.log(`moving file from ${source_path} to ${destination_path}`);
        moveFile(source_path,destination_path);
        console.log('The file has been moved');
        idx++;
    }
}

// returns true if the provided filepath is of a file
// else false if it is of a directory
function checkPathisDirectoryOrNot(src_path){
    let ans = fs.lstatSync(src_path).isFile();
    return ans;
}

// gets all the childrens of the folder(means all the content inside it)
function childrenReader(src_path){
    let childrens = fs.readdirSync(src_path) ;
    // console.log("children are :" + childrens);
    return childrens;
}


// finds the file format and returns the destination folder of the file
function find_file_format(file_ext,file_extensions,file_formats){
    let file_extension_found = false;
    
    for(let row=0;row<file_extensions.length;row++)
    {   found_file_format = false;
        for(let col=0;col<file_extensions[row].length;col++)
       {
            if(file_extensions[row][col] === file_ext)
            {   
                file_extension_found = true;
                return file_formats[row];
            }
       } 
    }
    if(file_extension_found === false)
    {return "Others";}
}

function get_specific_dir(filename){
    let substrings = filename.split(".");
    let last_idx = substrings.length - 1;
    let file_ext = substrings[last_idx];
    // let specific_dir_arr = ["audio","video","text","executable","Images","Documents","Others"];
    console.log(file_ext);

    // all the file extensions available 
    let audio_files = ["mp3","wav","aac","adt","adts","cda","m4a"];
    let video_files = ["mp4","avi","webm","mpeg","mov"];
    let text_files = ["txt","rtf","log","pdf"];
    let executable_files = ["exe","msi","bat","py","cpp","rb","pyw","php","java"];
    let compressed_files = ["zip","gz","jar"];
    let images_files = ["png","jpeg","jpg","gif","tiff","raw"];
    let documents_files = ["xps","xlsx","xls","pptx","doc","docx","accdb","html","htm","csv","dif","ai","indd"];

    // folders for the different file formats
    var file_extensions = [images_files,text_files,documents_files,audio_files,video_files,executable_files,compressed_files];
    var file_formats =["Images","Text Files","Documents","Audio files","Videos","Executables","Compressed files","Others"];

    // getting the format of file 
    let specific_dir = find_file_format(file_ext,file_extensions,file_formats);
    console.log(specific_dir);

    // returning the destination folder of file
    return specific_dir;
    }

function untreefy(src_path,dest,node){

    let isFile = checkPathisDirectoryOrNot(src_path);
    if(isFile == true){
       
        // getting the actual name of the file from its path 
        // getting the name of the directory in which it needs to be copied
        // merging the des_path, specific_directory and filename name to create final dest_path
        let file_name = path.basename(src_path);
        let dest_dir = get_specific_dir(file_name);
        dest_dir = path.join(dest, dest_dir);
        // checks if dest_dir is available and creates if not available
        if (!fs.existsSync(dest_dir)){
            fs.mkdirSync(dest_dir, { recursive: true });
           }
        // creating the final destination path 
        dest_path = path.join(dest_dir,file_name); 
        console.log(dest_path);
        source_array.push(src_path);
        destination_array.push(dest_path);
       
       node.isFile = true;
       node.name = path.basename(src_path);
    //    node.newName = newFileName;
    
    }
    else{
        // src_path is a directory

        node.isFile = false;
        node.name = path.basename(src_path);
        node.childrens = [];
    
        let childrens = childrenReader(src_path);

        for(let i = 0;i<childrens.length;i++)
        {
            let cpath = path.join(src_path,childrens[i]);
            let chobj = {};
            untreefy(cpath,dest,chobj);
            node.childrens.push(chobj);
        }
    }
}
