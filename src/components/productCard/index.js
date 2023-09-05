import React from "react";

const ProductCard = (props) => {
    const {
        image,
        name,
        brand,
    } = props;
    return (
        <><img src={`${image}`} alt={`${name}`} width="50px" /><div>
            <div className="ellipsis" style={{ width: 120 }}>{`${brand}`}
            </div>
            <div className="ellipsis" style={{ width: 200 }}>{`${name}`}
            </div>
        </div></>
    );
}

export default ProductCard;
