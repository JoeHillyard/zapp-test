import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {useProductStore} from "../store/product.store.ts";
import axios from "axios";
import {BASE_PRODUCTS_URL} from "../App.tsx";

type Inputs = {
    id: number
    description: string
    quantity: number
    sku: string
    store: string
}

export function CreateUpdateProductForm() {

    const {updateProductId, updateProduct, setCurrentProducts, setUpdateProduct} = useProductStore()

    const {register, handleSubmit, watch, formState: {errors}, setValue, reset} = useForm<Inputs>({
        defaultValues: {
            description: updateProduct?.description,
            quantity: updateProduct?.quantity,
            sku: updateProduct?.sku,
            store: updateProduct?.store,
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (!!updateProductId) {
            axios.put(`${BASE_PRODUCTS_URL}/${updateProductId}`, data).then((response) => {
                setCurrentProducts(response.data);
                setUpdateProduct(undefined, undefined)
            }).catch((error) => {
                console.log(error);
            });
        } else {

            const {id, ...productData} = data

            axios.post(BASE_PRODUCTS_URL, productData).then((response) => {
                setCurrentProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        reset()
    }

    useEffect(() => {

        if (!!updateProductId) {
            setValue('id', updateProductId)
            setValue('description', updateProduct?.description)
            setValue('quantity', updateProduct?.quantity)
            setValue('sku', updateProduct?.sku)
            setValue('store', updateProduct?.store)
        }
    }, [updateProductId]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <label>ID </label>
                    <input readOnly {...register("id")} />
                </div>
                <div>
                    <label>Description </label>
                    <input {...register("description", {required: true})} />
                </div>
                <div>
                    <label>Quantity </label>
                    <input type={'number'} min={0} {...register("quantity", {required: true, min: 0})} />
                </div>
            </div>
            <div style={{paddingBottom: 20}}>
                <div>
                    <label>SKU </label>
                    <input {...register("sku", {required: true})} />
                </div>
                <div>
                    <label>Store </label>
                    <input {...register("store", {required: true})} />
                </div>
            </div>
            <button style={{fontSize: 14, backgroundColor: 'grey'}}>
                Clear
            </button>
            <button style={{fontSize: 14}} type="submit">
                Save
            </button>
        </form>
    )
}