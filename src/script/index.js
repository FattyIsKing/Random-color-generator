const color = document.getElementById("color");
const generate = document.getElementById("generate");
const saved = document.getElementById("saved");
const save = document.getElementById("save");
const style = document.getElementById("style");

let rgb, r, g, b, hexColor, hexTranslate, checker = 0, i = 0;

const savedColors = [];

if(localStorage.getItem("ile") !== null){
    
    let ile = parseInt(localStorage.getItem("ile"));
    console.log(ile);
    for(i; i<=ile; i++){
        
        let savedColor = document.createElement("div");
        let savedColorText = document.createElement("div");
        let savedColorDrown = document.createElement("div");
        
        let color = `color${i}`;

        savedColorText.innerHTML = `- ${localStorage.getItem(color)}<br>`;
        savedColorDrown.style.backgroundColor = localStorage.getItem(color);
        savedColorDrown.style.height = "10px";
        savedColorDrown.style.width = "10px";

        savedColor.appendChild(savedColorText);
        savedColor.appendChild(savedColorDrown);
        savedColor.classList.add("colorHolder");
        
        saved.appendChild(savedColor);
    }
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}


function rgbToHex(r, g, b) {
    hexTranslate = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const randomColorRGB =()=>{
    r = parseInt(Math.random() * (255 - 1) + 1);
    g = parseInt(Math.random() * (255 - 1) + 1);
    b = parseInt(Math.random() * (255 - 1) + 1);
    
    rgb = `rgb(${r}, ${g}, ${b})`;
}


const randomColorHex =()=>{
    hexColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
}


generate.addEventListener("click", ()=>{
    if(style.innerHTML == "RGB"){
        randomColorRGB();
        color.value = rgb;
        color.style.borderColor = rgb;
        color.style.color = rgb;
    }
    else if(style.innerHTML == "Hex"){
        randomColorHex();
        color.value = hexColor;
        color.style.borderColor = hexColor;
        color.style.color = hexColor;
    }
});


save.addEventListener("click", ()=>{
    const savedColor = document.createElement("div");
    const savedColorText = document.createElement("div");
    const savedColorDrown = document.createElement("div");
    
    function check(item){
        if(item == color.value){
            checker += 1;
        }
    }

    savedColors.forEach(check);

    if(checker > 0){
        Swal.fire(
            'Uwaga!',
            '<b>Taki kolor został już zapisany!</b>',
            'error'

        );
        console.log(color.value);
        checker = 0;
    }
    else if(color.value == ""){
        Swal.fire(
            'Uwaga!',
            '<b>Nie wygenerowałeś koloru!</b>',
            'error'

        );
    }
    else{
        savedColorText.innerHTML = `- ${color.value} <br>`;
        savedColorDrown.style.backgroundColor = color.value;
        savedColorDrown.style.height = "10px";
        savedColorDrown.style.width = "10px";

        savedColor.appendChild(savedColorText);
        savedColor.appendChild(savedColorDrown);
        savedColor.classList.add("colorHolder");
        savedColors.push(`${color.value}`);
    
        saved.appendChild(savedColor);

        
        localStorage.setItem(`color${i}`, color.value);
        localStorage.setItem(`ile`, i);
        i+=1;
    }


    
});


style.addEventListener("click", ()=>{
    if(style.innerHTML == "RGB"){
        style.innerHTML = "Hex";
        
        if(color.value != ""){
            rgbToHex(r, g, b);
            color.value = hexTranslate;
        }

    }
    else if(style.innerHTML == "Hex"){
        style.innerHTML = "RGB";

        if(color.value != ""){
            console.log(`${hexToRgb(color.value).r}, ${hexToRgb(color.value).g}, ${hexToRgb(color.value).b}`);

            color.value = `rgb(${hexToRgb(color.value).r}, ${hexToRgb(color.value).g}, ${hexToRgb(color.value).b})`;
        }
    }
});