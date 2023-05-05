import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "./firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	updateDoc,
} from "firebase/firestore";

export const styles = {};

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	// Create todo
	const createTodo = async (e) => {
		e.preventDefault();
		if (input === "") {
			alert("Please enter a valid todo.");
			return;
		}
		await addDoc(collection(db, "todos"), {
			text: input,
			completed: false,
		});
		setInput("");
	};

	// Read todo
	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArr = [];
			querySnapshot.forEach((doc) => {
				todosArr.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArr);
		});
		return () => unsubscribe();
	}, []);
	// Update todo
	const handleComplete = async (todo) => {
		await updateDoc(doc(db, "todos", todo.id), {
			completed: !todo.completed,
		});
	};

	// Delete todo
	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "todos", id));
	};

	return (
		<div className="bg-[whitesmoke] w-full h-screen">
			<div className="max-w-[1240px] w-full mx-auto p-12">
				<h1 className="text-[pink] font-bold text-7xl text-center py-4">
					todos
				</h1>
				<div className="bg-white max-w-[900px] mx-auto h-full rounded-2xl shadow-lg">
					<form
						onSubmit={createTodo}
						className="w-full flex justify-between items-center border-b-4"
					>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							type="text"
							placeholder="Add todo"
							className="w-full p-4 border-gray-500 text-gray-500 outline-0 text-xl rounded-2xl"
						/>
						<button
							onClick={createTodo}
							className="mx-4 text-gray-500 cursor-pointer"
						>
							<AiOutlinePlus size={25} />
						</button>
					</form>
					<ul>
						{todos.map((todo, index) => (
							<Todo
								key={index}
								todo={todo}
								handleComplete={handleComplete}
								handleDelete={handleDelete}
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
