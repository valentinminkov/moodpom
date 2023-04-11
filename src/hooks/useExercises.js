import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { breathingExercises, meditationExercises } from "../dummyData/data";

const useExercises = () => {
  const { appState, setAppState } = useContext(AppContext);
  const { isRightOn, exercise } = appState;
  const exercises = isRightOn ? meditationExercises : breathingExercises;
  const exerciseIndex = exercises.findIndex(
    (newExercise) => newExercise.name === exercise?.name
  );

  useEffect(() => {
    if (!exercise) {
      setAppState({ exercise: exercises[0] });
    }
  }, [exercise, exercises, setAppState]);

  const setDefaultExercise = (newIsRightOn) => {
    const newExercises = newIsRightOn
      ? meditationExercises
      : breathingExercises;
    setAppState({ exercise: newExercises[0] });
  };

  const adjustExercise = (increase = false) => {
    let newIndex = exerciseIndex;
    if (newIndex > 0 && !increase) newIndex--;
    if (newIndex < exercises.length - 1 && increase) newIndex++;
    if (newIndex !== exerciseIndex)
      setAppState({ exercise: exercises[newIndex] });
  };

  return {
    exercises,
    exerciseIndex,
    adjustExercise,
    exercise,
    setDefaultExercise,
  };
};

export default useExercises;
