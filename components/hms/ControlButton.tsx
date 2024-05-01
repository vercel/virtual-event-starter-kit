export default function ControlButton(props: any) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={props.onClick}
        type="button"
        className={`flex items-center justify-center w-11 h-11 rounded-full border-solid border-2 ${
          props.active ? 'border-gray-200' : 'border-gray-base'
        } focus:outline-none focus:border-gray-400 focus:bg-gray-800 ${props.className}`}
      >
        {props.children}
      </button>
      <span className="text-xxs mt-1">{props.text}</span>
    </div>
  );
}