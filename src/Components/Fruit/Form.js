import { useState } from "react";

export default function Form() {
  return (
    <div>
      <h3>Add a new Fruit</h3>
      <label>Name</label>
      <input type="text" value="" name="name" />
      <br />
      <label>Description</label>
      <input type="text" value="" name="description" />
      <br />
      <label>Image</label>
      <input type="file" value="" name="file" />
      <br />
      <input type="submit" value="submit" name="submit" />
    </div>
  );
}
