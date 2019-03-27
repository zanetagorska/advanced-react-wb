import React from "react";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";

const Item = ({ item: { title, description, id, price, image } }) => {
  return (
    <ItemStyles>
      {image && <img src={image} alt="" />}
      <Title>
        <Link
          href={{
            pathname: "/item",
            query: { id }
          }}
        >
          <a>{title} </a>
        </Link>
      </Title>
      <p>{description}</p>

      <PriceTag>{formatMoney(price)}</PriceTag>
      <div className="buttonList">
        <Link
          href={{
            pathname: "/update",
            query: { id: id }
          }}
        >
          <a>Edit</a>
        </Link>
        <button>Add to card</button>
        <button>Delete</button>
      </div>
    </ItemStyles>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
