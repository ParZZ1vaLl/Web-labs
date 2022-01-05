import Work from "./Work.js"
import URL from "./URL.js"
import WorkTrans from "./WorkTrans.js"

const segment1 = document.querySelector(".first-segment")
const segment3 = document.querySelector(".third-segment")
const segment4 = document.querySelector(".fourth-segment")
const segment6 = document.querySelector(".six-segment")
const button = document.querySelector(".find")
const input = document.querySelector(".argument")
const text = document.querySelector(".text-field")

function createTableForm() {
    let tableForm = document.createElement("form")
    tableForm.className = "tableForm"
    tableForm.appendChild(createInput("width","text"))
    tableForm.appendChild(createInput("data","text"))
    let button = createInput("Add","Button")
    let count = 0
    let noTable = true
    let currTable
    button.addEventListener("click", ()=> {
        const className = tableForm.getAttribute("target")
        if(noTable) {
            currTable = createTable()
            document.querySelector(`.${className}`).appendChild(currTable)
            noTable = false
        }
        currTable.appendChild(createLi(tableForm.elements.width.value, tableForm.elements.data.value, className))
        count++
        if(count % 2 == 0) {
            currTable.setAttribute("style","grid-template-columns:repeat(2,fit-content(0px))")
        } else {
            currTable.removeAttribute("style")
        }
    })
    tableForm.appendChild(button)

    return tableForm
}

//task 1
segment1.addEventListener("click", (event) => {
    let tableForm = segment1.querySelector(".tableForm")
    if(tableForm) {
        const elements = tableForm.querySelectorAll("input")
        for(let element of elements){
            if(event.target == element){
                return
            }
        }
    }
    if(event.target == text) {
        return
    }
    rewrite(segment6.querySelector("h1"),segment1.querySelector("span"))
})

segment6.addEventListener("click", (event) => {
    let tableForm = segment6.querySelector(".tableForm")
    if(tableForm){
        const elements = tableForm.querySelectorAll("input")
        for(let element of elements){
            if(event.target == element){
                return
            }
        }
    }

    rewrite(segment6.querySelector("h1"), segment1.querySelector("span"))
}
)

function rewrite(segment1, segment2) {
    const temp = segment1.innerHTML
    segment1.innerHTML = segment2.innerHTML
    segment2.innerHTML = temp
}

//task 2
const radius = 4
const segment5 = document.querySelector(".fifth-segment")

let out = document.createElement("h3", 'class="output"')
out.innerHTML = "Result : " + (Math.PI*Math.pow(4,2)).toFixed(2)

let isShown = false

segment5.addEventListener("click", (event) => {
    let form = segment5.querySelector(".tableForm")
    if (form) {
        for(let input of form.querySelectorAll("input")){
            if(event.target == input){
                return
            }
        }
    }

    if(event.target == button | event.target == input) {
        return
    }
    if(!isShown){
        segment5.appendChild(out)
    }
    else {
        segment5.removeChild(out)
    }
    isShown=!isShown
})

//task 3

for(let record of document.cookie.split(";")){
    record = record.trim()
    let [key,value] = record.split("=")
    if(key === "Minimal" & value != "") {
        let accept = confirm(record + ", Зберегти?")
        document.forms.minimal.setAttribute("style", "display:none")
        if(accept) {
            alert("В вас наявні кукі, перезавантажте сторінку")
        } else {
            document.cookie = "Minimal="
            location.reload()
        }
    }
}

button.addEventListener("click", () => {
    if(isNaN(input.value)) {
        alert("Error")
        return
    }
    let min = Infinity
    for(let digit of input.value) {
        if(min > +digit) {
            min = +digit
        }
    }
    alert(min)
    document.cookie = `Minimal=${min}`
})

//task 4
let color = localStorage.getItem("color")
if(color) {
    segment6.setAttribute("style",`background:${color}`)
}

text.addEventListener("select", (event) => {
    let selected = event.target.value
    selected = selected.substring(event.target.selectionStart, event.target.selectionEnd)
    segment6.setAttribute("style",`background:${selected}`)
    localStorage.setItem("color", selected)
})

//task5

localStorage.clear()
if(color != null) {
    localStorage.setItem("color", color)
}

function createInput(name,type) {
    let input = document.createElement("input")
    input.setAttribute("type",type)
    input.setAttribute("name",name)
    input.setAttribute("value", name)
    return input
}

const segments = document.querySelectorAll(".main-container div")
for(let i = 0; i < segments.length; i++) {
    let image = segments[i].querySelector("img")
    if(!image){
        continue
    }

    image.addEventListener("mouseout",() => {
        if(segments[i].querySelector(".tableForm") != undefined) {
            return
        }
        let form = createTableForm()
        segments[i].appendChild(form)
        form.setAttribute("target",segments[i].className)
    })
}


function createTable() {
    let table = document.createElement("ul")
    table.className = "table"
    return table
}

function createLi(width, data, segment) {
    const li = document.createElement("li")
    li.innerHTML = data
    li.setAttribute("style",`max-width:${width}px`)
    let button = document.createElement("button")
    button.innerHTML = "Save"
    button.addEventListener("click", () => {
        let currData = localStorage.getItem(segment)
        if(!currData) {
            localStorage.setItem(segment, data)
        } else {
            localStorage.setItem(segment, `${currData} ${data}`)
        }
        li.removeChild(button)
    })
    li.appendChild(button)
    return li
}

const output = document.querySelector(".controller")
const data = {
    begin: "Begin",
    start: "start",
    stop: "stop",
    reload: "reload",
    left: "top",
    right: "bottom",
    close: "close",
    end: "end",
    speed: 100
}
//lab4
const work = new WorkTrans(segment3, output,data)

document.querySelector(".Play").addEventListener("click", (e) => {
    e.stopPropagation()
    if(segment4.querySelector(".work")!=null) {
        return
    } 
    if(output.querySelector("span")) {
        output.removeChild(output.querySelector("span"))
    }
    work.mount()
})

document.querySelector(".Save").addEventListener("click", (e) => {
    e.stopPropagation()
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    
    }).then(r => r.text()).then(r => console.log(r))
})


