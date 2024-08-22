export const truncateText = (text: string, letters: number) => {
  const newText = text.split("").slice(0, letters);
  if (newText.length === letters) return newText.join("") + "...";
  else return newText.join("");
};
