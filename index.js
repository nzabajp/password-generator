const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const passwordLength =document.getElementById("passwordLength")
const lightMode = document.getElementById("lightMode")
const lightBtn = document.getElementById("lightBtn")
const container = document.getElementById("container")
const subHead = document.getElementById("subHead")
const modal = document.getElementById("modal-container")

let passwordProps = {
    length: 15,
    nums: true,
    symbs: true,
    light: false
}

function toggleLight() {
    if(passwordProps.light) {
        lightMode.style.backgroundColor = "#ECFDF5"
        lightBtn.style.transform = "translateX(15px)"
        container.style.backgroundColor = "#1F2937"
        container.style.color = "white"
        subHead.style.color = "#D5D4D8"
        passwordProps = {
            ...passwordProps,
            light: false
        }
        console.log(lightMode.classList)
    } else {
        lightMode.style.backgroundColor = "#1F2937"
        lightBtn.style.transform = "translateX(1px)"
        container.style.backgroundColor = "#ECFDF5"
        container.style.color = "#2B283A"
        subHead.style.color = "#6B7280"
        passwordProps = {
            ...passwordProps,
            light: true
        }
    }
    console.log(passwordProps)
}

function modifyPassword(event) {
    const {id, checked} = event.target
    if(id === "numbers") {
        passwordProps = {
            ...passwordProps,
            nums: checked
        }
    } else if(id === "symbols") {
        passwordProps = {
            ...passwordProps,
            symbs: checked
        }
    }
}

function copyPassword(event) {
    const {innerHTML} = event.target
    if(innerHTML) {
        navigator.clipboard.writeText(innerHTML)
        .then(function() {
            modal.style.display = "block"
        }, function(err) {
            alert(err)
        });
    }
}

function closeModal() {
    modal.style.display = "none"
}

function toggleClick() {
    let {length, nums, symbs} = passwordProps
    length = passwordLength.value
    password1.textContent = generatePassword(length, nums, symbs)
    password2.textContent = generatePassword(length, nums, symbs)
}

function generatePassword(length, nums, symbs) {
    const randomArr = []
    let modifiedChar = []
    
    if(nums === false && symbs === false) {    
        modifiedChar = characters.slice(0,52)
    } else if(nums === true && symbs === false) {
        modifiedChar = characters.slice(0,62)
    } else if(nums === false && symbs === true) {
        const firstArr = characters.slice(0,52)
        const secondArr = characters.slice(62)
        modifiedChar = [...firstArr, ...secondArr]
    } else {
        modifiedChar = [...characters]
    }

    for(let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * modifiedChar.length)
        randomArr.push(index)
    }

    return randomArr.map(char => modifiedChar[char]).join("")
}

function selectLength() {
    passwordLength.select()
}