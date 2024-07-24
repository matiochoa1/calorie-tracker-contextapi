import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import { ActivityList } from "./components/ActivityList";
import { CalorieTracker } from "./components/CalorieTracker";

function App() {
	const [state, dispatch] = useReducer(activityReducer, initialState);

	useEffect(() => {
		localStorage.setItem("activities", JSON.stringify(state.activities));
	}, [state.activities]);

	const CanRestartApp = () =>
		useMemo(() => state.activities.length, [state.activities]);
	return (
		<>
			<header className=" bg-sky-700 py-3">
				<div className="max-w-4xl mx-auto flex justify-between items-center">
					<h1 className="text-center text-lg font-bold text-white uppercase">
						Contador de calorias
					</h1>

					<button
						className="bg-gray-900 hover:bg-gray-800 p-2 font-bold uppercase text-white cursor-pointer text-sn rounded-lg disabled:opacity-10"
						disabled={!CanRestartApp()}
						onClick={() => dispatch({ type: "restart-app" })}>
						Reiniciar App
					</button>
				</div>
			</header>

			<section className="bg-sky-500 py-20 px-5">
				<div className="max-w-4xl mx-auto">
					<Form />
				</div>
			</section>

			<section className="bg-gray-800 p-10">
				<div className="max-w-4xl mx-auto">
					<CalorieTracker />
				</div>
			</section>

			<section className="p-10 mx-auto max-w-4xl">
				<ActivityList />
			</section>
		</>
	);
}

export default App;
