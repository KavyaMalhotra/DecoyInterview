// components/Button.jsx

function Button({ text, onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      >
        {text}
      </button>
    );
  }
  
  export default Button;
  