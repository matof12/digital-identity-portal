import { mockDevices } from "../mocks/data";

let devices = [...mockDevices];

export async function getDevices(){
    await new Promise (resolve => setTimeout(resolve, 500)); // Nuevamente simulamos un retraso en la red
    return [...devices];
}

export async function deleteDevice (id: string){
    await new Promise (resolve => setTimeout(resolve, 500)); 
    devices = devices.filter(device => device.id !== id);
    return true;    
}