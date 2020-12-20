function createSticky() {
    let body = document.querySelector("body");
    let stickyPad = document.createElement("div");
    stickyPad.setAttribute("class", "stickyPad");
    stickyPad.innerHTML = `<div class="sticky-header">
    <div class="minimize circle"></div>
    <div class="close circle"></div>
    </div>
    <div class="sticky-writePad">
    <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>`
    body.appendChild(stickyPad);
    // close logic
    let close = stickyPad.querySelector(".close");
    close.addEventListener("click", function () {
        stickyPad.remove();
    })
    // /minmize
    let minmize = stickyPad.querySelector(".minimize");
    let textarea = stickyPad.querySelector("textarea");
    let stickHeader=stickyPad.querySelector(".sticky-header");
    let isMinmized=false;
    minmize.addEventListener("click",function(){
        if(isMinmized==true){
            textarea.style.display="block";
// maximize 
        }else{
            // minimize
            // hide
            textarea.style.display="none";
        }
        isMinmized=!isMinmized
    })


    
    let initialX=null;
    let initialY=null;
    let isStickyDown=false;
    stickHeader.addEventListener("mousedown",function(e){
        // /
        e.stopImmediatePropagation();
initialX=e.clientX;
initialY=e.clientY;
isStickyDown=true;
    })
    stickHeader.addEventListener("mousemove",function(e){
        e.stopImmediatePropagation();
        if(isStickyDown==true){
            let finalX=e.clientX;
            let finalY=e.clientY;
            let dx=finalX-initialX;
            let dy=finalY-initialY;
            let obj=stickyPad.getBoundingClientRect();
            let top=obj.top;
            let left=obj.left;
            stickyPad.style.top=top+dy+"px";
            stickyPad.style.left=left+dx+"px";
            initialX=finalX;
            initialY=finalY;
        }
        
    })
    window.addEventListener("mouseup",function(e){

        isStickyDown=false;
        
    })


}



