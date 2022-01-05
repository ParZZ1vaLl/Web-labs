
export default class Accordions {
    constructor(element) {
        this.element = element
        this.items = new Map()
        this.list = document.createElement("div")
    }

    setItems() {
        this.element.appendChild(this.list)
        this.list.className="task"
    }

    _createAccordion(name) {
        const line = document.createElement("p")
        const plus = document.createElement("span")
        const cros = document.createElement("i")
        cros.innerHTML ="X"
        plus.innerHTML = "+"
        const title = document.createElement("span")
        title.innerHTML = name
        line.className = "acordion"
        let wrap = false
        plus.addEventListener("click", () => {
            const panel = line.nextElementSibling
            if(!wrap) {
                panel.setAttribute("style", "display:block")
            } else {
                panel.removeAttribute("style")
            }
            wrap = !wrap
        })
        plus.className = "wrapper"
        cros.addEventListener("click", this._removeItem.bind(this, name))
        const nav = document.createElement("div")
        line.appendChild(title)
        nav.appendChild(cros)
        nav.appendChild(plus)
        line.appendChild(nav)
        return line
    }

    createAcc(name, value) {
        for(let key of this.items.keys()) {
            if(name == key.firstChild.innerHTML) {
                throw new Error("Exist acordion")
            }
        }
        const accordion = this._createAccordion(name)
        const panel = document.createElement("span")
        panel.innerHTML = value
        panel.className = "panel"
        this.list.appendChild(accordion)
        this.list.appendChild(panel)
        this.items.set(accordion,panel)
    }

    setList(parent) {
        const task = document.createElement("div")
        task.className = "task"
        for(let key of this.items.keys()) {
            task.appendChild(key)
            key.querySelector("i").setAttribute("style", "display:none")
            task.appendChild(this.items.get(key))
        }
        parent.appendChild(task)
    }

    _removeItem(name) {
        for(let key of this.items.keys()) {
            if(key.firstChild.innerHTML == name) {
                this.list.removeChild(key)
                this.list.removeChild(this.items.get(key))
                this.items.delete(key)
                continue
            }
        }
    }

    getItems() {
        let items =[]
        for(let key of this.items.keys()) {
            items.push({name: key.firstChild.innerHTML,
            value:this.items.get(key).innerHTML}) 
        }
        return items
    }
}