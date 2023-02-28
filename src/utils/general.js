import { MINUTE } from "../constants";

const convertToMinutes = (time) => {
  return time * MINUTE;
};

const addClassWithDelay = (targetContainerClass, classToAdd, delay) => {
  setTimeout(() => {
    const breakContainer = document.querySelector(`.${targetContainerClass}`);
    breakContainer.classList.add(classToAdd);
  }, delay);
};

const removeClassWithDelay = (targetContainerClass, classToRemove, delay) => {
  setTimeout(() => {
    const breakContainer = document.querySelector(`.${targetContainerClass}`);
    breakContainer.classList.remove(classToRemove);
  }, delay);
};

export { convertToMinutes, addClassWithDelay, removeClassWithDelay };
