import React, { useEffect, useContext, useState } from "react";
import CardGame from "../components/cards/card-game/card-game";
import { getPlatforms } from "../services/rawg-service";
import FirebaseContext from "../firebase/context";

export default function Home() {
  const { firebase } = useContext(FirebaseContext);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    // getPlatforms({ ordering: "name" })
    //   .then((res) => {
    //     setPlatforms(res.data.results);
    //   })
    //   .catch((error) => {
    //     console.log("Error!", error);
    //   });

    firebase.firestore
      .collection("platforms")
      .orderBy("name", "asc")
      .onSnapshot((snaps) => {
        setPlatforms(snaps.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      {platforms.map((platform) => (
        <CardGame
          key={platform.id}
          title={platform.name}
          subtitle="Burano, Venice, Italy"
          iconName="fas fa-heart"
          btnIcon="fas fa-arrow-right"
          bgPhoto={platform.image_background}
          secondTitle="$250 per night"
          totalReviews={30}
          ratingAverage={4.5}
        />
      ))}
    </>
  );
}
