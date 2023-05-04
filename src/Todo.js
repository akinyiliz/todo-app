import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function Todo({ todo }) {
	return (
		<li className="h- flex items-center justify-between p-4 border-b">
			<div className="flex items-center text-xl text-gray-700">
				<input
					type="checkbox"
					className="h-[30px] text-gray-700"
				/>
				<p className="ml-2">{todo}</p>
			</div>

			<FaTrashAlt size={20} />
		</li>
	);
}

export default Todo;
