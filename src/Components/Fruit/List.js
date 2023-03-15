import { useEffect, useState } from "react";
import { onChildAdded, ref as databaseRef } from "firebase/database";
import { database } from "../../firebase";
import FruitCard from "./FruitCard";

export default function List() {
  const DB_NAME_KEY = "fruits";

  const [fruits, setFruit] = useState([]);

  useEffect(() => {
    console.log(fruits);

    const fruitRef = databaseRef(database, DB_NAME_KEY);
    onChildAdded(fruitRef, (data) => {
      let fruit = {
        name: data.val().name,
        url: data.val().url,
        description: data.val().description,
        date: data.val().date,
      };

      setFruit((prevState) => [...prevState, fruit]);
    });
  }, []);

  useEffect(() => {
    console.log(fruits);
    console.log(typeof fruits);
  });

  return (
    <div>
      {fruits && fruits.length > 0 ? (
        fruits.map((item) => (
          <FruitCard
            name={item.name}
            url={item.url}
            description={item.description}
            date={item.date}
          />
        ))
      ) : (
        <>
          <p>No data</p>
        </>
      )}
    </div>
  );
}
