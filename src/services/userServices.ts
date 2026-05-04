import axios from 'axios';
import { mockUser } from '../mocks/data';

export async function getProfile() {
    const res = await axios.get ("https://randomuser.me/api/?seed=matias")
    const external = res.data.results[0];
    return {
        ...mockUser,
        avatar: external.picture.large,
        phone: external.phone
    }
}

export async function updateProfile (data: Partial<typeof mockUser>) {
    //Llamada a la API para actualizar el perfil

    await new Promise (resolve => setTimeout(resolve, 1000)); // En este caso trate de simular un retraso de la red como si fuese llamada a la API de update

    return {
        ...mockUser,
        ...data
    }
}