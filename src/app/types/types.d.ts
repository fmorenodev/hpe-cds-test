interface User {
    username: string,
    password: string
}

interface CityData {
    id: number,
    name: string,
    state: string,
    country: string,
    coord: {
        lon: number,
        lat: number
    }
}