export function stripHTMLTags(htmlString: string) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  return tempElement.textContent || tempElement.innerText || "";
}
