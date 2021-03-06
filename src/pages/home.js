import React, { useEffect, useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import CardGame from "../components/cards/card-game/card-game";
import FirebaseContext from "../firebase/context";
import { useGlobalLoading } from "../core/providers/GlobalLoaderProvider";
// import { getPlatforms } from "../services/rawg-service";

export default function Home() {
  const { firebase } = useContext(FirebaseContext);
  const { setIsLoading } = useGlobalLoading();
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    // getPlatforms({ ordering: "name" })
    //   .then((res) => {
    //     setPlatforms(res.data.results);
    //   })
    //   .catch((error) => {
    //     console.log("Error!", error);
    //   });

    setIsLoading(true);
    firebase.firestore
      .collection("platforms")
      .orderBy("name", "asc")
      .onSnapshot((snaps) => {
        setIsLoading(false);
        setPlatforms(snaps.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <Grid container spacing={3}>
      {platforms.map((platform, index) => (
        <Grow key={platform.id} in={true} timeout={50 * index}>
          <Grid item sm={12} md={6} lg={4} xl={2}>
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
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}
