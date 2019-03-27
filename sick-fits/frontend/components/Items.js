import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;
const ItemsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0;
  background: pink;
`;
const Item = styled.li`
  list-style: none;
  background: turquoise;
`;

const Items = () => {
  return (
    <Center>
      <p>Items</p>
      <Query query={ALL_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          console.log(data);
          if (loading) return "Loading...";
          if (error) return `Error ${error.message}`;
          return (
            <ItemsList>
              {data.items.map(item => (
                <Item key={item.id}>{item.title}</Item>
              ))}
            </ItemsList>
          );
        }}
      </Query>
    </Center>
  );
};

export default Items;
