ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
let activeTool = 'pencil';
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
function handleTool(tool){
    if(tool=="pencil"){
        if(activeTool=="pencil"){
            pencilOptions.classList.add("show");
        } else{
            ctx.strokeStyle = "black";
            activeTool = "pencil";
            eraserOptions.classList.remove("show");
        }
    } else if(tool == "eraser"){
        if(activeTool == "eraser"){
            eraserOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "white"; //white for eraser
            activeTool = "eraser";
            pencilOptions.classList.remove("show");
        }
    } else if(tool == "sticky"){
        createSticky();
    } else if(tool == "upload"){
        uploadFile();
    } else if(tool == "undo"){
        undoLast();
    } else if(tool == "redo"){
        redoLast();
    }
}

function changeColor(color){
    ctx.strokeStyle = color;
    socket.emit("colorChange",color);
}

let silders = document.querySelectorAll("input[type='range']");
for(let i=0;i<silders.length;i++){
    silders[i].addEventListener("change",function(){
        let width = silders[i].value;
        ctx.lineWidth = width;
    })
}
