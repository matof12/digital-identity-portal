import { mockActivities } from "../mocks/data";

export async function getActivity (page: number, pageSize: number) {
    await new Promise ((r) => setTimeout(r, 500)); 
    const start = (page - 1) * pageSize;
    return {
        items: mockActivities.slice(start, start + pageSize),
        total: mockActivities.length
    }
}