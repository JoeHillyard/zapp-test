import './App.css'
import {Table} from "./components/table.comp.tsx";
import {UploadSection} from "./sections/upload.section.tsx";
import {CreateUpdateProductForm} from "./sections/create-update.form.tsx";
import {useProductStore} from "./store/product.store.ts";

export const BASE_PRODUCTS_URL =  `http://localhost:3000/product`;

function App() {
    const {currentProducts} = useProductStore()

    return (
        <>
            <UploadSection/>
            <hr/>
            <Table heading={['ID', 'Description', 'Quantity', 'SKU', 'Store']}
                   body={currentProducts?.map(d => [d.id, d.description, d.quantity, d.sku, d.store])}
            />
            <hr/>
            <CreateUpdateProductForm/>
        </>
    )
}

export default App
