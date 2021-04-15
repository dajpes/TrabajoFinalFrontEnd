import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import Input from "../Input";
import Button from "../Button";

export default function Header() {
  const [loginResponse, setLoginResponse] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    const login = await axios
      .post("http://localhost:8082/api/user/login", e)
      .catch((e) => e.response);

    if (login.status === 500) {
      setLoginResponse(login.data.message);
      return;
    } else if (login.status === 200) {
      setLoginResponse(`Gracias por loguearte ${login.data.name}`);
    }
  };
  return (
    <div className="flex pb-4 mb-4 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex ml-auto mr-20 space-x-4"
      >
        {loginResponse && <div>{loginResponse}</div>}
        {!loginResponse && (
          <>
            <Input
              type="email"
              label="Email"
              {...register("email", { required: "Email es requerido" })}
            >
              {errors["email"] && (
                <p className="text-sm text-red-500">
                  {errors["email"]?.message}
                </p>
              )}
            </Input>

            <Input
              type="password"
              label="Contraseña"
              {...register("password", { required: "Password es requerido" })}
            >
              {errors["password"] && (
                <p className="text-sm text-red-500">
                  {errors["password"]?.message}
                </p>
              )}
            </Input>
            <Button type="submit" text="Login" className="place-self-center" />
          </>
        )}
      </form>
    </div>
  );
}
