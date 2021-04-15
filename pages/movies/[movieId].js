import { useRouter } from "next/router";
import useSWR, { trigger } from "swr";

import axios from "axios";
import Layout from "../../src/components/PageLayout";
import Button from "../../src/components/Button";
import EditMovie from "../../src/components/Movie/MovieCE";

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
export default function Movie() {
  const router = useRouter();

  const { data, error } = useSWR(requestsList, fetchData);
  if (error) {
    return (
      <div>
        <p>Hay un error</p>
        <Button text="Volver al home" onClick={() => router.push("/")} />
      </div>
    );
  }

  const onEditRating = async () => {
    const rate = Math.floor(Math.random() * 20);
    console.log("🚀 ~ file: [movieId].js ~ line 37 ~ rate", rate)
    try {
      await axios.put(
        `http://localhost:8082/api/movie/rate/${router.query.movieId}`,
        { rating: rate }
      );
      trigger();
    } catch (e) {
      console.log("error intentando Cambiar el rating", e);
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8082/api/movie/delete/${router.query.movieId}`
      );
      trigger();
      router.push("/");
    } catch (e) {
      console.log("error intentando borrar movie", e);
    }
  };
  if (!data) {
    return <p>Cargando</p>;
  }
  if (data) {
    if (!router.isReady) return null;
    const movie = data.movies.find(
      (movieItem) => movieItem.id === Number(router.query.movieId)
    );
    return (
      <Layout>
        <div>
          <h1 className="mb-4 text-4xl">{movie.name}</h1>
          <img src={movie.image} alt={movie.name} />
          <p>{movie.description}</p>
          <p>Genero de {movie.genderId.name}</p>
          <p>Rating: {movie.rating}</p>
          <p>{movie.releaseDate}</p>
          <Button text="Eliminar Movie" className="mt-5" onClick={onDelete} />
          <Button
            text="Cambiar Rating por numero Random"
            className="mt-5"
            onClick={onEditRating}
          />
        </div>
        <h2 className="text-2xl font-bold">Editar Pelicula</h2>
        <EditMovie
          genders={data.genders}
          defaultValues={movie}
          typeOfMethod="edit"
        />
        <Button
          text="Regresar al home"
          className="mt-5"
          onClick={() => router.push("/")}
        />
      </Layout>
    );
  }
}
