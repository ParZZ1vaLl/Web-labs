import Accordions from "./Accordions.js";
import url from "./url.js"
const form = document.forms.creatorAcc
const title = form.elements.title
const value = form.elements.value
const add = form.elements.add
const save = form.elements.save
const segment = document.querySelector(".fourth-segment")

const accordions = new Accordions(segment)
accordions.setItems()
fetch(url)
.then(r => r.text()).then(text => {
    const items = JSON.parse(text)
    for(let item of items) {
        accordions.createAcc(item.name, item.value)
    }
})

add.addEventListener("click", () => {
    try{
        accordions.createAcc(title.value, value.value)
    } catch(e) {
        alert(e)
    }
})

save.addEventListener("click", () => {
    const items = accordions.getItems()
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(items)
    
    }).then(r => r.text()).then(r => console.log(r))
})
