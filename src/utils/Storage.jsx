export class Storage {
  
    static getData(data) {
        if(localStorage.getItem(data) != null) {            
            return JSON.parse(localStorage.getItem([data]))
        }
    }

    static setData(data, value) {
        localStorage.setItem([data], JSON.stringify(value))
    }

    static filterData(data, item, value) {
        let aux = this.getData(data);
        aux = aux.filter(items => items[item] === value);
        return [...aux];
    }

    static findById(data, id) {
        let aux = this.getData(data);
        aux = aux.filter(items => items.id === parseInt(id));
        return aux.length === 1 ? aux[0].name: 'No Existe' 
    }

    static nextID(data) {
        let id = data.reduce((id, data) => id = id > data.id ? id : data.id, 0);
        return id + 1
    }
}