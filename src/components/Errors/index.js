import Button from "../Button";
export default function Errors({ ErrorMessage }) {
  return (
    <div className="flex justify-center flex-col space-y-5">
      <h2>Ops {ErrorMessage}</h2>
      <Button onClick={() => location.reload()} text="Carga otra vez la pagina"/>
    </div>
  );
}
