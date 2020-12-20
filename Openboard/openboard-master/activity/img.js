let imgInput = document.querySelector("#acceptImg");
function uploadFile(){
    imgInput.click();
    imgInput.addEventListener("change",function(){
        // this contains the array of files which are uploaded, which contains all info 
        // like name, length, type
        // console.log(imgInput.files);
        let imgObj = imgInput.files[0];
        console.log(imgObj);
        let imgLink = URL.createObjectURL(imgObj);
        let img = document.createElement("img");
        // this class will set width and height equal to its parent's dimensions.
        img.setAttribute("class","upload-img");
        img.src = imgLink;
        let textBox = createBox();
        textBox.appendChild(img);
    })
}

function downloadBoard(){
    //1. create an achor
    let a = document.createElement("a");
    //2. set file name to it's download attribute
    a.download = "file.png";
    //3. convert board to Url
    let url = board.toDataURL("image/") 
    //4. set as href of anchor
    //5. click the anchor 
}
