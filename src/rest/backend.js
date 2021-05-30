import axios from 'axios'
import { routes } from './routes'

const post = async (url, data) => {
    const request = {
        method: 'post',
        url: url,
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    }

    try{
        const response = await axios(request)
        return response.data 
    }catch(err){
        console.error(err)
        throw Error(err + JSON.stringify(data))
    }
}

const get = async (url) => {
    const request = {
        method: 'get',
        url: url,
        headers: {
            "Content-Type": "application/json"
        }
    }
    try{
        const response = await axios(request)
        return response.data 
    }catch(err){
        console.error(err)
        throw Error(err)
    }
}

const del = async (url) => {
    const request = {
        method: 'delete',
        url: url,
        headers: {
            "Content-Type": "application/json"
        }
    }
    try{
        const response = await axios(request)
        return response.data 
    }catch(err){
        console.error(err)
        throw Error(err)
    }
}

const patch = async (url,data) => {
    const request = {
        method: 'patch',
        url: url,
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    }
    try{
        const response = await axios(request)
        return response.data 
    }catch(err){
        console.error(err)
        throw Error(err)
    }
}
//Countries
export const getAllCountries = async () => {
    const countries = await get(routes.countries.getAll())
    return countries
}

export const getCountry = async (idCountry) => {
    const country = await get(routes.countries.getById(idCountry))
    return country
}

export const deleteCountry = async (idCountry) => {
    await del(routes.countries.delete(idCountry))
    return idCountry
}

export const updateCountry = async (idCountry, newData) => {
    const updatedCountry = await patch(routes.countries.update(idCountry), newData)
    return updatedCountry
}

export const createCountry = async (newCountry) => {
    const createdCountry = await post(routes.countries.create(), newCountry)
    return createdCountry
}
//Cities
export const getAllCities = async () => {
    const cities = await get(routes.cities.getAll())
    return cities
}

export const getCity = async (idCity) => {
    const city = await get(routes.cities.getById(idCity))
    return city
}

export const deleteCity = async (idCity) => {
    await del(routes.cities.delete(idCity))
    return idCity
}

export const updateCity = async (idCity, newData) => {
    const updatedCity = await patch(routes.cities.update(idCity), newData)
    return updatedCity
}

export const createCity = async (newCity) => {
    const createdCity = await post(routes.cities.create(), newCity)
    return createdCity
}

//Companies / Organizations
export const getAllCompanies = async () => {
    const cities = await get(routes.companies.getAll())
    return cities
}

export const getCompany = async (idCompany) => {
    const company = await get(routes.companies.getById(idCompany))
    return company
}

export const deleteCompany = async (idCompany) => {
    await del(routes.companies.delete(idCompany))
    return idCompany
}

export const updateCompany = async (idCompany, newData) => {
    const updatedCompany = await patch(routes.companies.update(idCompany), newData)
    return updatedCompany
}

export const createCompany = async (newCompany) => {
    const createdCompany = await post(routes.companies.create(), newCompany)
    return createdCompany
}
//jobs
export const getAllJobs = async () => {
    const Jobs = await get(routes.jobs.getAll())
    return Jobs
}

export const getJob = async (idJob) => {
    const Job = await get(routes.jobs.getById(idJob))
    return Job
}

export const deleteJob = async (idJob) => {
    await del(routes.jobs.delete(idJob))
    return idJob
}

export const updateJob = async (idJob, newData) => {
    const updatedJob = await patch(routes.jobs.update(idJob), newData)
    return updatedJob
}

export const createJob = async (newJob) => {
    const createdJob = await post(routes.jobs.create(), newJob)
    return createdJob
}