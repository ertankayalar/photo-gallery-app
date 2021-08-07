import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Container from "../../../components/layout/container";
import DropdownTreeSelect from "react-dropdown-tree-select";
import CreatableSelect from "react-select/creatable";
import "react-dropdown-tree-select/dist/styles.css";
import styles from "./form.module.css";

const UserCollectionForm = ({
  collection = null,
  categories,
  tags,
  onSubmit,
}) => {
  const [id, setId] =
    collection != null ? useState(collection.id) : useState(null);
  const [name, setName] =
    collection != null ? useState(collection.name) : useState("");
  const [description, setDescription] =
    collection != null ? useState(collection.description) : useState("");
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const formTitle = collection == null ? "New Collection" : "Update Collection";
  const submitButtonText = collection == null ? "Add" : "Update";

  const tagOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const categoryData = {
    label: "search me",
    value: "searchme",
    children: [
      {
        label: "search me too",
        value: "searchmetoo",
        children: [
          {
            label: "No one can get me",
            value: "anonymous",
          },
        ],
      },
    ],
  };

  const onChange = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes);
  };
  const onAction = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };

  const TagHandle = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  async function submitHandler(event) {
    event.preventDefault();

    // check required fields
    if (!name || name.length < 10) {
      setError(
        "invalid input - collection name should be least 10 characters long"
      );
    }

    // if ok then
    //    console.info('form submit handler here')

    if (error == "") {
      const result = await onSubmit({
        id: id,
        name: name,
        description: description,
      });

      // console.log('result form', result)
      // setStatusMsg(result.data.status_message)

      // redirect to view

      if (result.status == 200) {
        Router.push(`/member/collection/${result.data.id}`);
      }
    }
  }

  return (
    <Container>
      <div>
        <form onSubmit={submitHandler}>
          <div className="w-full px-5 py-8 mx-auto my-10 border rounded bg-gray-50">
            <div className="w-full text-center">
              <h2 className="my-3 text-2xl text-gray-700">{formTitle}</h2>
              <p className="text-sm text-gray-500">
                Describe your collection details
              </p>
            </div>

            <div className="flex flex-wrap w-full">
              <div className="w-full p-5 md:w-1/2">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setError("");
                      setName(event.target.value);
                    }}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mt-5">
                  <span className="text-gray-700">Description</span>
                  <textarea
                    onChange={(event) => {
                      setError("");
                      setDescription(event.target.value);
                    }}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {description}
                  </textarea>
                </label>
              </div>
              <div className="w-full p-5 md:w-1/2">
                <label className="block">
                  <span className="text-gray-700">Category</span>

                  <DropdownTreeSelect
                    mode="radioSelect"
                    data={categories}
                    onChange={onChange}
                    onAction={onAction}
                    onNodeToggle={onNodeToggle}
                    className={styles.category}
                  />
                </label>

                <label className="block mt-5">
                  <span className="text-gray-700">Tags</span>

                  <CreatableSelect
                    isMulti
                    onChange={TagHandle}
                    options={tags}
                    className="py-1 m-0"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button className="px-4 py-3 my-5 text-white bg-gray-700 rounded hover:bg-gray-600 focus:bg-gray-800 focus:outline-none">
                {submitButtonText}
              </button>
            </div>
          </div>
        </form>
        <p>{statusMsg}</p>
      </div>
      {error && (
        <div className="w-1/2 p-5 mx-auto my-5 text-red-700 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold text-red-700">Error</h3>
          <p>{error}</p>
        </div>
      )}
    </Container>
  );
};

export default UserCollectionForm;
