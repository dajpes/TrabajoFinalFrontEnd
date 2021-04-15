export default function Button({ onClick, disabled, text = "", className }) {
  return (
    <button
      className={`bg-indigo-500 p-2 text-white rounded-full text-xl pb-3 px-5 focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
