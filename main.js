const colorPicker = document.getElementsByClassName('cpicker');
const colorHexText = document.getElementsByClassName('chex');
const colorContainer =  document.getElementsByClassName('coolors');
const colorNumber = document.getElementsByClassName('cnumber');
const mainContainer = document.getElementsByClassName('main-content');

function createCoolorsGrid(){
    var i;
    for (i = 0; i <= 4; i++){
        if ('content' in document.createElement('template')) {
            const template = document.querySelector('#coolors-template-grid');
            const clone = document.importNode(template.content, true);
            mainContainer[0].appendChild(clone);
            colorContainer[i].classList.add('c' + (i + 1));
            if(i < 9){
                colorNumber[i].textContent = '0' + (i + 1);
            } else {
                colorNumber[i].textContent = (i + 1);
            };
            const cClass = document.getElementsByClassName('c' + i);
            const randColorHex = colorHexText[i].textContent = '#' + Math.floor(Math.random()*16777215).toString(16);
            colorPicker[i].value = randColorHex;
            colorContainer[i].style.backgroundColor = randColorHex

            //const cNumber = document.querySelectorAll('.cnumber');
            //cNumber[i].textContent = '0' + i;
       }
    }
    changeValueColorPicker();
    copyHexValue();
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        var childs = document.getElementsByClassName('coolors ');
        while(childs.length){
            childs[0].parentNode.removeChild(childs[0]);
        }
    }
    createCoolorsGrid();
}


function changeValueColorPicker(){
    const arrayColorPicker = Array.from(colorPicker);
    arrayColorPicker.forEach(element => {
        element.addEventListener('input', () => {
            const colorHex = element.value;
            element.closest('.coolors').style.backgroundColor = colorHex;
            element.parentElement.previousElementSibling.previousElementSibling.textContent = colorHex;
        })
    });
}


function copyHexValue(){
    document.addEventListener('click', function(e) {
        const target = e.target;
        if(target.classList.contains('coolors')){
            
            const targetHexElement = target.querySelectorAll('.cdescription .chex');
            const targetHexValue = targetHexElement[0].innerText;
            const clipboard = document.getElementById('clipboard');
            clipboard.value = targetHexValue;
            clipboard.select();
            document.execCommand("copy");
            const copiedElement = document.getElementsByClassName('color-copied');
            copiedElement[0].classList.add('animation-copied');
            setTimeout(() => {
                copiedElement[0].classList.remove('animation-copied');
            }, 1500);
        }
    })
}

createCoolorsGrid()
