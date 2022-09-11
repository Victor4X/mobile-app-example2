import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function DetailsScreen({ route }) {
  // State holding movie data.
  const [data, setData] = useState({});

  // Get movieID from navigate function
  const { movieId } = route.params;

  // When this component is mounted then fire the getDetails function
  useEffect(() => {
    getDetails();
  }, []);

  // Function to fetch details about the movie
  function getDetails() {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        }}
      />
      <Text style={styles.title}>{data.title}</Text>
      <Text>{data.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "300px",
  },
});
