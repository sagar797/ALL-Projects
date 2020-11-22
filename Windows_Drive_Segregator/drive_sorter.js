// Note :
// finds all the files and folders present 
// inside the directory and saves their path 
// and data info as in json format

let fs = require("fs-extra");
let path = require("path");

// returns true if the provided filepath is of a file
// else false if it is of a directory
function checkPathisDirectoryOrNot(src_path){
    let ans = fs.lstatSync(src_path).isFile();
    return ans;
}

// gets all the childrens of the folder(means all the content inside it)
function childrenReader(src_path){
    let childrens = fs.readdirSync(src_path) ;
    return childrens;
}

function get_specific_dir(filename){
    let substrings = filename.split(".");
    let last_idx = substrings.length - 1;
    let file_ext = substrings[last_idx];
    let specific_dir_arr = ["audio","video","text","executable","Images","Documents","Others"];
    console.log(file_ext);
    switch(file_ext)
    {
        case "mp4" :
        case "wav" :
        case "mp3" : var specific_dir = specific_dir_arr[0];
                        break;
        case "mp4" :
        case "avi" :                    
        case "webm" : var specific_dir = specific_dir_arr[1];
                        break;                
        case "txt" : var specific_dir = specific_dir_arr[2];
                        break;
        case "exe" : var specific_dir = specific_dir_arr[3];
                        break;
        case "jpg" :
        case "png" :
        case "gif" :
        case "jpeg" : var specific_dir = specific_dir_arr[4];
                        break;
        case "doc" :
        case "ppt" :    
        case "pptx" :
        case "xls" :
        case "xlsx" :
        case "xps" :
        case "docx" : var specific_dir = specific_dir_arr[5];
                        break;
        default : var specific_dir = specific_dir_arr[6];
                        break;
    }
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
      
        // copies the file from the source_folder to the destination_folder
        fs.copyFileSync(src_path,dest_path);
       
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

let root = {};
untreefy(process.argv[2],process.argv[3],root);
// makes and writes in the file dir_structure.json , all the actual file locations
fs.writeFileSync(path.join(process.argv[3],"dir_structure.json"),JSON.stringify(root));
