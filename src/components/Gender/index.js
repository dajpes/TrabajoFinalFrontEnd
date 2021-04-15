export default function Gender({genders}) {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-10">Generos de Peliculas</h1>
      {genders.length > 0 && (
        <ul className="space-y-1">
          {genders.map(({ id, name: gender }) => (
            <dd key={id}>{gender}</dd>
          ))}
        </ul>
      )}
    </div>
  );
}
