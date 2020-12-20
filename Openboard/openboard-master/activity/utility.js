function createBox(){
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");
    //add classes 
    stickyPad.setAttribute("class","stickyPad");
    navBar.setAttribute("class","nav-bar");
    close.setAttribute("class","close");
    minimize.classList.add("minimize");
    textbox.setAttribute("class","textbox");
    // create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    //add subtree to Page
    //added the subtree in the body of our page.
    document.body.appendChild(stickyPad);
    //close => remove 
    close.addEventListener("click",function(){
        stickyPad.remove();
    })
    let isOpen = true;
    //minimize =>
    minimize.addEventListener("click",function(){
        if(isOpen){
            textbox.style.display = "none";
        } else {
            textbox.style.display = "block";
        }
        isOpen = !isOpen;
    })
    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    navBar.addEventListener("mousedown",function(e){
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })
    navBar.addEventListener("mousemove",function(e){
        if(isStickyDown){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX-initialX;
            let dy = finalY-initialY;
            let {top,left} = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dy +"px";
            stickyPad.style.left = left+ dx+"px";
            initialX = finalX;
            initialY = finalY;
        }
    })
    //on navbar, when you pressed mouse and then leave 
    navBar.addEventListener("mouseoff",function(e){
        isStickyDown = false;
    })
    //when you leave mouse outside navbar, then also it will do isStickyDown false;
    navBar.addEventListener("mouseleave",function(){
        isStickyDown = false;
    })
    return textbox;
}


function getLocation(){
    let {top} = board.getBoundingClientRect();
    return top;
}