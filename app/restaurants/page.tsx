import { Suspense } from "react";
import Restaurants from "./restaurants";

const RestaurantsPage = () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantsPage;
