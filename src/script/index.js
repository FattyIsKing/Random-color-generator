const random = document.getElementById("random");
const btnRandom = document.getElementById("btnRandom");
const box__color = document.querySelector(".box__color");
const elementToCopy = document.getElementById('exampleText');
const sixteen = document.getElementById("sixteen");
const RGB = document.getElementById("RGB");
const copy = document.getElementById("copy");


const handleRGB =()=>{
    let a = Math.random();
    let x = Math.random();
    let c = Math.random();
    a *= 255;
    x *= 255;
    c *= 255;
    let r = parseInt(a);
    let g = parseInt(x);
    let b = parseInt(c);
    RGB.style.backgroundColor = "black";
    RGB.style.color = "white";
    sixteen.style.background = "none";
    sixteen.style.color = "black";
    box__color.style.backgroundColor = "white";
    random.value = "";
    const handleRandom =()=>{
        let a = Math.random();
        let x = Math.random();
        let c = Math.random();
        a *= 255;
        x *= 255;
        c *= 255;
        let r = parseInt(a);
        let g = parseInt(x);
        let b = parseInt(c);
        box__color.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        random.value = `rgb(${r}, ${g}, ${b})`;
    }

    btnRandom.addEventListener("click", handleRandom);
}

RGB.addEventListener("click", handleRGB);

const handleSixteen =()=>{
    box__color.style.backgroundColor = "white";
    random.value = "";
    RGB.style.background = "none";
    sixteen.style.backgroundColor = "black";
    sixteen.style.color = "white";
    RGB.style.color = "black";
    const handleRandom =()=>{
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        box__color.style.backgroundColor = `#${randomColor}`;
        random.value = `#${randomColor}`;    
    }
    btnRandom.addEventListener("click", handleRandom);
}

sixteen.addEventListener("click", handleSixteen);


const handleCopy =()=>{
    window.getSelection(random).selectAllChildren(elementToCopy);
    document.execCommand('copy');
    if(random.value != ""){
        alert(`Skopiowanie: ${random.value}`);
    }
}

copy.addEventListener("click", handleCopy);

const Checker =()=>{
    if(RGB.style.backgroundColor == "none" && sixteen.style.backgroundColor == "none"){
        alert("Nie wybrałeś żadnego systemu!");
    }
}

btnRandom.addEventListener("click", Checker);
