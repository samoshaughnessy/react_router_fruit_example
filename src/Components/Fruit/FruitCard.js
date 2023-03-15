export default function FruitCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.url} alt={props.name} />
      <h3>{props.description}</h3>
      <h4>{props.date}</h4>
    </div>
  );
}
