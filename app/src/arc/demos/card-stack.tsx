// From Arc's docs page (Usage), imports pointed at the copied source
import { CardStack } from "../card-stack/card-stack";

const cities = [{ id: "lis", name: "Lisbon" }, { id: "osl", name: "Oslo" }, { id: "kyo", name: "Kyoto" }];

export function Shortlist() {
  return (
    <CardStack
      items={cities}
      getKey={city => city.id}
      getLabel={city => city.name}
      renderCard={city => <h3>{city.name}</h3>}
      labels={{ left: "Skip", right: "Shortlist" }}
      onDecide={(city, decision) => save(city.id, decision)}
    />
  );
}
