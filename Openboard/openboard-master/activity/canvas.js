//press mouse
let isPenDown = false;  
let undoArr  = [];
let redoArr = [];
board.addEventListener("mousedown",function(e){
    //begin Path
    ctx.beginPath(); //ctx initialized in its last file, will be accessed here also.
    //move to mouse pointers location 
    // console.log(e); 
     // in this e, we can see that the coording where we have clicked or the location of mouse 
    //pointer is in clientX and client Y.
    let x = e.clientX;
    let y = e.clientY;
    //subtract the height of div (which is 80), so as to prevent the shifting while drawing.
    // y = Number(y) - 80; or better to use getLocation fn 
    let top = getLocation();
    y = Number(y) - top;
    let mdp = {
        x,
        y,
        id:"md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    undoArr.push(mdp);
    ctx.moveTo(x,y);
    console.log("Pen down");
    isPenDown = true; //if we have pressed, then only line should be drawn.

    // point => realtime draw 
    socket.emit("md",mdp);
})
// on move
board.addEventListener("mousemove",function(e){
    if(isPenDown){
        console.log("Mouse move");
        //lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();

        y = Number(y) - top;
        ctx.lineTo(x,y);
        //stroke
        ctx.stroke();
        //mouse move 
        let mmp = {
            x,
            y,
            id:"mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoArr.push(mmp);
        socket.emit("mm",mmp);
    }
})
board.addEventListener("mouseup",function(e){
    console.log("Mouse up");
    isPenDown = false;
})

function getLocation(){
    let {top} = board.getBoundingClientRect(); //it can gives the top, left of ay element.
    return top;
}

function undoLast(){
    if(undoArr.length>0){
        //1. pop the last point 
        // undoPop();
        // //2. clear the canvas 
        // ctx.clearRect(0,0,board.width,board.height);
        // //3. redraw 
        // redraw();

        //sir method 
        if (undoArr.length >= 2) {
            //  lines 
            console.log(undoArr);
            let tempArr = []
            for (let i = undoArr.length - 1; i >= 0; i--) {
                console.log(undoArr[i]);
                let id = undoArr[i].id;
                if (id == "md") {
                    tempArr.unshift(undoArr.pop());
                    break;
                } else {
                    // undoArr.pop();
                    tempArr.unshift(undoArr.pop());
                }
            }
            redoArr.push(tempArr);
            //  clear canvas=> 
            ctx.clearRect(0, 0, board.width, board.height);
            // redraw
            redraw();
        }
    }
}

function redoLast(){
     if(redoArr.length>0){
         //lines
         let undoPath = redoArr.pop();
         for(let i=0;i<undoPath.length;i++){
             undoArr.push(undoPath[i]);
         }
         //clear canvas 
         ctx.clearRect(0,0,board.width, board.height);
         //redraw 
         redraw();
     }
}

function undoPop(){
    while(undoArr.length>1){
        // push returns the length of the redo fn.
        // let {x,y,id,color,width} = redoArr.push(undoArr.pop());
        let {x,y,id,color,width} = undoArr.pop();
        redoArr.push(x,y,id,color,width);
        if(id == "md"){
            break;
        }
    }
    redoArr.push(undoArr.pop());
}

function redraw(){
    for(let i=0;i<undoArr.length;i++){
        let {x,y,id,color,width} = undoArr[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if(id == "md"){
            ctx.beginPath();
            ctx.moveTo(x,y);
        } else if(id == "mm"){
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}