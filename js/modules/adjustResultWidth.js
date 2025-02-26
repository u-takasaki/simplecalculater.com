export function adjustResultWidth(element, minWidth){

  element.style.width = "auto";
  let computedWidth = element.offsetWidth;

  if(computedWidth < minWidth){
    computedWidth = minWidth;
  }

  element.style.width = `${computedWidth}px`;
}