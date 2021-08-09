import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Container from "../../../components/layout/container";
import DropdownTreeSelect from "react-dropdown-tree-select";
import CreatableSelect from "react-select/creatable";
//import "react-dropdown-tree-select/dist/styles.css";
import styles from "./form.module.css";
import DropdownContainer from "../../ui/dropdown-container";
import * as utils from "../../../lib/utils";

const UserCollectionForm = ({
  collection = null,
  categoryOptions,
  tagOptions,
  onSubmit,
}) => {
  const [id, setId] =
    collection != null ? useState(collection.id) : useState(null);
  const [name, setName] =
    collection != null ? useState(collection.name) : useState("");
  const [description, setDescription] =
    collection != null ? useState(collection.description) : useState("");
  const [category, setCategory] =
    collection != null ? useState(collection.category) : useState("");
  const [tags, setTags] =
    collection != null ? useState(collection.tags) : useState([]);
  const [newTags, setNewTags] = useState([]);
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const formTitle = collection == null ? "New Collection" : "Update Collection";
  const submitButtonText = collection == null ? "Add" : "Update";

  const getTagItems = (tagValues) => {
    const newItems = tagValues.filter((tag) => {
      return tag?.__isNew__;
    });

    const selectedItems = (tags) => {
      const items = tags.filter((tag) => {
        return !tag?.__isNew__;
      });

      return items.map((tag) => {
        return tag.value;
      });
    };

    return {
      new: newItems,
      selected: selectedItems(tagValues),
    };
  };

  const onChange = (currentNode, selectedNodes) => {
    console.group("Treeview Value Changed");
    console.log("onChange::", currentNode, selectedNodes);
    console.log("selected value:", currentNode.value);
    setCategory(currentNode.value);

    console.groupEnd();
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
    if ((actionMeta.action = "select-option")) {
      const tagItems = getTagItems(newValue);
      console.log("tagItems", tagItems);

      // add New Tag Values
      //{label: "dene", value: "dene", __isNew__: true}

      setTags(tagItems.selected);
      setNewTags(tagItems.new);
    }
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
      console.group("collection form submit");
      const result = await onSubmit({
        id: id,
        name: name,
        description: description,
        category: category,
        tags: tags,
        newTags,
      });

      // console.log('result form', result)
      // setStatusMsg(result.data.status_message)

      // redirect to view
      console.log("result:", result);
      if (result.status == 200) {
        Router.push(`/member/collection/${result.data.id}`);
      }
      console.groupEnd();
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

                  <DropdownContainer
                    mode="radioSelect"
                    data={categoryOptions}
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
                    options={tagOptions}
                    className="py-1 m-0"
                    defaultValue={tags}
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
