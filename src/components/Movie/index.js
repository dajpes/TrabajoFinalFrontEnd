import axios from "axios";
import AddMovie from "./MovieCE";
import Button from "../Button";
import { useRouter } from "next/router";
const fetchMovies = async (url) => {
  const result = await axios.get(url);
  return result.data;
};

export default function Movie({ genders, movies }) {
  const router = useRouter();
  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">Mis Peliculas</h1>
      {movies.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-10">
          {movies.map((movie) => (
            <div
              className="shadow-2xl rounded-lg flex flex-col pb-5"
              key={movie.id}
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{movie.name}</h2>
              </div>
              <Button
                text="Ver Más"
                className="place-self-center"
                onClick={() => router.push(`/movies/${movie.id}`)}
              />
            </div>
          ))}
        </div>
      )}
      {!movies.length && (
        <p className="my-5">Actualmente no tiene ninguna pelicula</p>
      )}
      {!genders.length && (
        <p>No puede agregar ninguna Pelicula si primero no hay generos</p>
      )}
      {genders.length > 0 && <AddMovie genders={genders} />}
    </div>
  );
}
