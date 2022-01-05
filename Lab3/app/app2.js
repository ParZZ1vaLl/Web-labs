import Accordions from "./Accordions.js"
import url from "./url.js"
const segment = document.querySelector(".fourth-segment")

const accordions = new Accordions(segment)

fetch(url)
.then(r => r.text()).then(text => {
    const items = JSON.parse(text)
    for(let item of items) {
        accordions.createAcc(item.name, item.value)
    }
    accordions.setList(segment)
})