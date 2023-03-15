import { useState } from "react";
import { push, ref as databaseRef, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../../firebase";

export default function Form() {
  const DB_NAME_KEY = "fruits";
  const STORAGE_NAME_KEY = "images/";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileInputFile, setFileInputFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");

  const submit = () => {
    const storageRefFull = storageRef(
      storage,
      STORAGE_NAME_KEY + fileInputFile.name
    );
    uploadBytes(storageRefFull, fileInputFile).then((snapshot) => {
      getDownloadURL(storageRefFull, fileInputFile.name).then((url) => {
        writeDatabase(url);
      });
    });
  };

  const writeDatabase = (url) => {
    const fruitsListRef = databaseRef(database, DB_NAME_KEY);
    const newFruitRef = push(fruitsListRef);
    set(newFruitRef, {
      name: name,
      description: description,
      url: url,
      date: new Date().toLocaleString(),
    });
  };

  return (
    <div>
      <h3>Add a new Fruit</h3>
      <label>Name</label>
      <input
        type="text"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Description</label>
      <input
        type="text"
        value={description}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Image</label>
      <input
        type="file"
        value={fileInputValue}
        name="file"
        onChange={(e) => {
          setFileInputFile(e.target.files[0]);
          setFileInputValue(e.target.file);
        }}
      />
      <br />
      <input type="submit" value="submit" onClick={submit} />
    </div>
  );
}
