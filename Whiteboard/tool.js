//    alert("Js Ran");
//    window=> represents current tab 
// document => represents current tab html
let canvas = document.querySelector(".board");
// increase the size of canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//    get browser tool => draw
// 2d ,3d,webgl 
let tool = canvas.getContext("2d");
tool.lineWidth=5
let Alltools = document.querySelectorAll(".tool-img");
let colors=document.querySelectorAll(".color");

let activeTool="pencil";
let pencilOptions=document.querySelector("#pencil-options");
let earserOptions=document.querySelector("#eraser-options");
// find all the matches elements
//tool change
for (let i = 0; i < Alltools.length; i++) {
    Alltools[i].addEventListener("click", function (e) {
        //    e.currentTarget
        let toolName = e.currentTarget.id;
        if (toolName == "pencil") {
if(activeTool=="pencil"){
    // options show
    pencilOptions.classList.remove("hidden");
}else{
    tool.strokeStyle = "blue";
    earserOptions.classList.add("hidden");
    activeTool="pencil";
}
} else if (toolName == "eraser") {
    if(activeTool=="eraser"){
        earserOptions.classList.remove("hidden");
        
    }else{
        
        tool.strokeStyle = "white";
        activeTool="eraser";
        pencilOptions.classList.add("hidden");
    }

        }
        else if(toolName=="sticky"){
            createSticky();
        }else if(toolName=="undo"){
            undoAction();
        }else if(toolName=="redo"){
redoAction();
        }
    })
}
// color change
for(let i=0;i<colors.length;i++){
    colors[i].addEventListener("click",function(e){
let color=e.currentTarget.id;
tool.strokeStyle=color;
    })
}


// size change
let slider=document.querySelector(".slider");
slider.addEventListener("change",function(e){

    let value=e.currentTarget.value;
    tool.lineWidth=value;
})


