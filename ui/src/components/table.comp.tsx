import axios from "axios";
import {useProductStore} from "../store/product.store.ts";

export function Table({heading, body}: { heading: string[], body: string[][] }) {
    return (
        <table style={{width: 500}}>
            <thead>
            <tr>
                {heading.map((head, headID) => (
                    <th key={headID}>{head}</th>
                ))}
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {body.map((rowContent, rowID) => (
                <TableRow
                    rowContent={rowContent}
                    key={rowID}
                />
            ))}
            </tbody>
        </table>
    );
}

function TableRow({rowContent}: { rowContent: string[] }) {

    const {setCurrentProducts, setUpdateProduct} = useProductStore()

    function handleDelete (){
        const url = `http://localhost:3000/product/${rowContent[0]}`;

        axios.delete(url).then((response) => {
            setCurrentProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdate(){
        setUpdateProduct(rowContent[0], {
            description: rowContent[1],
            quantity: parseInt(rowContent[2]),
            sku: rowContent[3],
            store: rowContent[4]
        })
    }

    return (
        <tr>
            {rowContent.map((val, rowID) => (
                <td key={rowID}>{val}</td>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <i className="fa fa-edit" onClick={() => handleUpdate()}></i>
                <i className="fa fa-trash" onClick={() => handleDelete()}></i>
            </div>
        </tr>
    );
}