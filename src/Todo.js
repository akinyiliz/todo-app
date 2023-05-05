import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const styles = {
	li: "h-full flex items-center justify-between p-4 border-b",
	liCompleted:
		"h-full flex items-center justify-between p-4 border-b bg-gray-400",
	text: "ml-2 capitalize cursor-pointer",
	textCompleted: "ml-2 capitalize line-through cursor-pointer",
};

function Todo({ todo, handleComplete, handleDelete }) {
	return (
		<li className={todo.completed ? styles.liCompleted : styles.li}>
			<div className="flex items-center text-xl text-gray-700">
				<input
					type="checkbox"
					className="h-[30px] text-gray-700 cursor-pointer"
					onChange={() => handleComplete(todo)}
					checked={todo.completed ? "checked" : ""}
				/>
				<p
					onClick={() => handleComplete(todo)}
					className={todo.completed ? styles.textCompleted : styles.text}
				>
					{todo.text}
				</p>
			</div>
			<button
				className="cursor-pointer"
				onClick={() => handleDelete(todo.id)}
			>
				<FaTrashAlt
					size={20}
					className="text-gray-700"
				/>
			</button>
		</li>
	);
}

export default Todo;
