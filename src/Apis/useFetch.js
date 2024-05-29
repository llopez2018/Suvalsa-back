import { useState } from "react";

export function UseFetch(url) {

    const[data,setData] = useState(null);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Otras cabeceras personalizadas
    };

        fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                console.log('data from fech' , data)
            })
            .catch((error) => console.error('Error:', error));


    return { data };
}