import { CaloryDisplay } from "./CaloryDisplay";
import { useActivity } from "../hooks/useActivity";

export const CalorieTracker = () => {
	const { caloriesConsumed, caloriesBurned, totalCalories } = useActivity();

	return (
		<>
			<h2 className="text-4xl font-black text-white text-center">
				Resumen de Calorías
			</h2>

			<div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
				<CaloryDisplay calories={caloriesConsumed} text="Consumidas" />

				<CaloryDisplay calories={caloriesBurned} text="Quemadas" />

				<CaloryDisplay calories={totalCalories} text="Diferencia" />
			</div>
		</>
	);
};
