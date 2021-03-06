import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form.js";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = ({ target: { value, type, name } }) => {
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "wb-tutorial");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkqwyl4gr/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION}>
        {(createItem, { loading, error }) => (
          <div>
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createItem({ variables: this.state });

                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Title"
                    onChange={this.uploadFile}
                  />
                  {this.state.image && (
                    <img
                      width="200"
                      src={this.state.image}
                      alt="Upload Preview"
                    />
                  )}
                </label>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    required
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
            <Error error={error} />
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
