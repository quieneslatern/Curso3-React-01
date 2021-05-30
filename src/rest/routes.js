const base = 'https://api-fake-pilar-tecno.herokuapp.com'

export const routes = {
    countries: {
        getAll: () => `${base}/countries`,
        getById: (id) => `${base}/countries/${id}`,
        delete: (id) => `${base}/countries/${id}`,
        create: () =>  `${base}/countries`,
        update: (id) => `${base}/countries/${id}`
    },
    cities: {
        getAll: () => `${base}/places`,
        getById: (id) => `${base}/places/${id}`,
        delete: (id) => `${base}/places/${id}`,
        create: () => `${base}/places`,
        update: (id) => `${base}/places/${id}`,
    },
    companies: {
        getAll: () => `${base}/organizations`,
        getById: (id) => `${base}/organizations/${id}`,
        delete: (id) => `${base}/organizations/${id}`,
        create: () => `${base}/organizations`,
        update: (id) => `${base}/organizations/${id}`,
    },
    jobs: {
        getAll: () => `${base}/jobs`,
        getById: (id) => `${base}/jobs/${id}`,
        delete: (id) => `${base}/jobs/${id}`,
        create: () => `${base}/jobs`,
        update: (id) => `${base}/jobs/${id}`,
    }
}