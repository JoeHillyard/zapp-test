import {create} from "zustand";

type ProductStore = {
    currentProducts: any[],
    setCurrentProducts: (data: any[]) => void,
    updateProductId: number | undefined,
    updateProduct: any,
    setUpdateProduct: (id, data) => void,
    clearUpdateProduct: () => void
}

export const useProductStore = create<ProductStore>((set) => ({

    currentProducts: [],
    setCurrentProducts: (data: any[]) => set(() => ({currentProducts: data})),

    updateProductId: undefined,
    updateProduct: undefined,

    setUpdateProduct: (id, data) => set({updateProductId: id, updateProduct: data}),
    clearUpdateProduct: () => set({updateProductId: undefined, updateProduct: undefined}),
}))