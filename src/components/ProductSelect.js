import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import ProductCard from "../views/product/components/productCard";
import Select from "./Select";

const ProductSelect = (props) => {

    let { name, handleProductChange, productOption } = props;
   
    const [productList, setProductList] = useState([]);

    const getProducts = async () => {
        let response = await ProductService.getOption();
        setProductList(response);
        productOption(response);
    };

    return (
        <>
            <Select
                name={name ? name : "product"}
                placeholder="Select Product"
                options={productList}
                handleChange={handleProductChange}
                autoFocus={getProducts}
            />
        </>
    )

}

export default ProductSelect;