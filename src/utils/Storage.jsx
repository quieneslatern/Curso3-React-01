import {
	createCountry,
	deleteCountry,
    getCountry,
	getAllCountries, 
	createCity,
	deleteCity,
    getCity,
	getAllCities,
	createCompany,
	deleteCompany,
	getAllCompanies,    
    createJob,
    deleteJob,
    getJob,
    getAllJobs
} from '../rest/backend';

const ppepe = {
    createCountry: createCountry,
    deleteCountry: deleteCountry,
    getCountry: getCountry,
    getAllCountries: getAllCountries, 
    createCity: createCity,
    deleteCity: deleteCity,
    getCity: getCity,
    getAllCities: getAllCities,
    createCompany: createCompany,
    deleteCompany: deleteCompany,
    getAllCompanies: getAllCompanies, 
    createJob: createJob,
    deleteJob: deleteJob,
    getJob: getJob,
    getAllJobs: getAllJobs,
}
export class Storage {

    static getData(data) {
        let getAll = 'getAll' + data.charAt(0).toUpperCase() + data.slice(1)
        
        console.log(getAll)
        let result 
        ppepe[getAll]()
            .then((data) => {
                console.log(data) 
                return result = data
            })
            .catch(() => {
                console.error('Error')
            });   
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