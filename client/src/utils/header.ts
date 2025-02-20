import { useUser } from "../context/UserContext";

export const header = () => {
    const { token } = useUser();
    return {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
}

export const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};