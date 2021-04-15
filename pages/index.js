import Gender from "../src/components/Gender";
import Movie from "../src/components/Movie";
import User from "../src/components/User";

import axios from "axios";
import useSWR from "swr";
import Layout from "../src/components/PageLayout";

const requestsList = [
  "http://localhost:8082/api/gender",
  "http://localhost:8082/api/movie",
];

const fetchData = async (genders, movies) => {
  const gendersResult = await axios.get(genders);
  const moviesResult = await axios.get(movies);
  return {
    genders: gendersResult.data,
    movies: moviesResult.data,
  };
};
export default function Home() {
  const { data: data, error } = useSWR(requestsList, fetchData);
  if (!data) {
    return <p>Cargando la Información </p>;
  }
  return (
    <Layout>
      <Movie genders={data.genders} movies={data.movies} />
      <Gender genders={data.genders} />
    </Layout>
  );
}
