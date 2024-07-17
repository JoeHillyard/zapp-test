import {useState} from "react";
import axios from "axios";
import {useProductStore} from "../store/product.store.ts";
import {BASE_PRODUCTS_URL} from "../App.tsx";

export function UploadSection() {

    const [file, setFile] = useState()

    const {setCurrentProducts} = useProductStore()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleUpload(event) {
        event.preventDefault()
        const url = `${BASE_PRODUCTS_URL}/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {headers: {'content-type': 'multipart/form-data'}};

        axios.post(url, formData, config).then((response) => {
            setCurrentProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleUpload}>
            <h2>File Upload</h2>
            <input type="file" onChange={handleChange}/>
            <button type="submit">Upload</button>
        </form>
    )
}