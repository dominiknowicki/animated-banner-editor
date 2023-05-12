// TODO: get available animation params for certain animation
//  from animation file - PARAMS OBJ SHOULD BE GENERIC!

export interface Params {
  animation: string
  background: string
  color: string
  fontSize: string
  loop: string
  text: string
  textPosition: string
}

export const DEFAULT_PARAMS: Params = {
  animation: "slide-right",
  background: "url('assets/media/corollaSedan_1000x750.jpg')",
  color: "#666",
  fontSize: "18",
  loop: "true",
  text: "Wyprzedaż rocznika 2022",
  textPosition: "bottom"
}
