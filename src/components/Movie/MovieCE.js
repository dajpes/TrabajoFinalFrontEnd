import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { trigger } from "swr";
import Button from "../Button";
import Input from "../Input";

const movieInputs = [
  { name: "name", label: "Nombre" },
  { name: "description", label: "Descripción" },
  { name: "actors", label: "Actores" },
  { name: "releaseDate", label: "Fecha de Estreno", type: "date" },
  {
    name: "rating",
    type: "number",
    label: "Rating",
    validations: { valueAsNumber: true },
  },
];

const fakeImages = [
  "https://picsum.photos/id/231/400/300",
  "https://picsum.photos/id/232/400/300",
  "https://picsum.photos/id/233/400/300",
  "https://picsum.photos/id/234/400/300",
  "https://picsum.photos/id/235/400/300",
  "https://picsum.photos/id/236/400/300",
  "https://picsum.photos/id/237/400/300",
];

export default function AddMovie({
  genders,
  defaultValues,
  typeOfMethod = "post",
}) {
  console.log("🚀 ~ file: MovieCE.js ~ line 40 ~ defaultValues", defaultValues);
  const [editMovie, setEditMovie] = useState(null);
  useEffect(() => {
    if (!defaultValues) return;
    console.log("me llamo");
    const newInput = movieInputs.map((input) => ({
      ...input,
      ...(defaultValues.hasOwnProperty(input.name) && {
        value: defaultValues[input.name],
      }),
    }));
    setEditMovie(newInput);
  }, [defaultValues]);
  const onSubmitMovie = async (requestData) => {
    try {
      if (typeOfMethod === "edit") {
        const result = await axios.put(
          `http://localhost:8082/api/movie/edit/${defaultValues.id}`,
          requestData
        );
      }else{
        const result = await axios.post(
          "http://localhost:8082/api/movie/create",
          requestData
        );
      }
      reset();
      trigger();
    } catch (e) {
      console.log("Error con pelicula", e);
    }
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Agrega una Pelicula Nueva!</h2>
      <form onSubmit={handleSubmit(onSubmitMovie)} className="flex flex-col">
        <div className="grid grid-cols-4 gap-2">
          {(editMovie ?? movieInputs).map((movieInput, index) => (
            <React.Fragment key={index}>
              <Input
                type={movieInput.type}
                label={movieInput.label}
                defaultValue={movieInput?.value}
                {...register(movieInput.name, {
                  required: `${movieInput.label} es requerido`,
                  ...movieInput.validations,
                })}
              >
                {errors[movieInput?.name] && (
                  <p className="text-sm text-red-500">
                    {errors[movieInput?.name]?.message}
                  </p>
                )}
              </Input>
            </React.Fragment>
          ))}
        </div>
        <div className="flex space-x-5">
          <div>
            <label className="flex flex-col justify-start mt-6 place-self-start">
              <span className="text-sm text-gray-500">
                Selecciona Una Imagen
              </span>
              <select
                className="w-32 p-2 mt-2 ml-2 border border-indigo-500 rounded-lg focus:outline-none"
                {...register("image", {
                  required: "Selecciona una imagen",
                })}
              >
                {fakeImages.map((image, index) => (
                  <option key={index} value={image}>{`Imagen N° ${
                    index + 1
                  }`}</option>
                ))}
              </select>
            </label>
            {errors["image"] && (
              <p className="text-sm text-red-500">{errors["image"]?.message}</p>
            )}
          </div>
          <div>
            <label className="flex flex-col justify-start mt-6 place-self-start">
              <span className="text-sm text-gray-500">
                Selecciona Un Genero
              </span>
              <select
                className="w-32 p-2 mt-2 ml-2 border border-indigo-500 rounded-lg focus:outline-none"
                {...register("genderId", {
                  required: "Selecciona un genero",
                  setValueAs: (v) => {
                    return { id: v };
                  },
                })}
                defaultValue={defaultValues?.genderId?.id}
              >
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.name}
                  </option>
                ))}
              </select>
            </label>
            {errors["genderId"] && (
              <p className="text-sm text-red-500">
                {errors["genderId"]?.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          text={typeOfMethod === 'post' ? 'Agregar Pelicula' : 'Editar Pelicula'}
          className="mt-10 place-self-center"
        />
      </form>
    </div>
  );
}
