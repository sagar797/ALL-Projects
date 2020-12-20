let initialMouseX = null;
let initialMouseY = null;
let isMouseDown = false;
tool.strokeStyle = "blue";
let undoArr=[];
let redoArr=[];
// isMouse Down=>
// path draw start 
let toolBar = document.querySelector(".toolbar");
canvas.addEventListener("mousedown", function onmouseDown(obj) {
    initialMouseX = obj.clientX;
    initialMouseY = obj.clientY - toolBar.offsetHeight;
    isMouseDown = true;
    // console.log("mouse down fired");
    tool.beginPath();
    tool.moveTo(initialMouseX, initialMouseY);
    let mdP={
        x:initialMouseX,
        y:initialMouseY,
        color:tool.strokeStyle,
        width:tool.lineWidth,
        type:"md"
    }
    undoArr.push(mdP);
});
// actual draw
canvas.addEventListener("mousemove", function (e) {
    let finalMouseX = e.clientX;
    let finalMouseY = e.clientY - toolBar.offsetHeight;
    if (isMouseDown == true) {
        // user has pressed the key and then he is moving
        tool.lineTo(finalMouseX, finalMouseY);
        tool.stroke();
        let mmP={
            x:finalMouseX,
            y:finalMouseY,
            color:tool.strokeStyle,
            width:tool.lineWidth,
            type:"mm"
        }
        undoArr.push(mmP);
    }
})
canvas.addEventListener("mouseup", function (obj) {
    isMouseDown = false;
    // console.log(undoArr)
    // delimiter
})

function undoAction(){
// clear screen
// underflow
if(undoArr.length>0){
    tool.clearRect(0,0,window.innerWidth,window.innerHeight);
    redoArr.push(undoArr.pop());
    // undoArr.length--;
    redraw();
}



// console.log(undoArr);

// pop-> last element 

// /redraw
}
function redoAction(){
    if(redoArr.length>0){
console.log(redoArr.length)
        tool.clearRect(0,0,window.innerWidth,window.innerHeight);
        undoArr.push(redoArr.pop());
        
         redraw();
    }
}
function redraw(){
    for(let i=0;i<undoArr.length;i++){
        let {x,y,color,type,width}=undoArr[i];
        tool.strokeStyle=color;
        tool.lineWidth=width;
        if(type=="md"){
            tool.beginPath();
    tool.moveTo(x, y);
        }else if(type=="mm"){
            tool.lineTo(x, y);
        tool.stroke(); 
        }
    }
}