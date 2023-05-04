import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export const styles = {};

function App() {
	const [todos, setTodos] = useState([]);

	// Create todo

	// Read todo
	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArr = [];
			querySnapshot.forEach((doc) => {
				todosArr.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArr);
			console.log(todosArr);
		});
		return () => unsubscribe();
	}, []);
	// Update todo

	// Delete todo
	return (
		<div className="bg-[whitesmoke] w-full h-screen">
			<div className="max-w-[1240px] w-full mx-auto p-12">
				<h1 className="text-[pink] font-bold text-7xl text-center py-4">
					todos
				</h1>
				<div className="bg-white max-w-[900px] mx-auto h-full rounded-2xl shadow-lg">
					<form className="w-full flex justify-between items-center border-b-4">
						<input
							type="text"
							placeholder="Add todo"
							className="w-full p-4 border-gray-500 text-gray-500 outline-0 text-xl rounded-2xl"
						/>
						<AiOutlinePlus
							size={25}
							className="mx-4 text-gray-500"
						/>
					</form>
					<ul>
						{todos.map((todo, index) => (
							<Todo
								key={index}
								todo={todo}
							/>
						))}
					</ul>
					<div>
						{todos.length < 1 ? null : (
							<p className="text-center text-base text-gray-500 py-2">
								{`You have ${todos.length} todos`}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
