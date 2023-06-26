// TODO: get available animation params for certain animation
//  with eg. gerParam() function that is implemented by AnimatorInterface
//  from animation file - PARAMS OBJ SHOULD BE GENERIC!
export interface Params {
  animation: string
  autosize: boolean
  background: string
  color: string
  fontsize: number
  height: number
  loop: string
  text: string
  textposition: string
  width: number
}

export const DEFAULT_PARAMS: Params = {
  animation: "slide-right",
  autosize: false,
  background: "url('assets/media/corollaSedan_1000x750.jpg')",
  color: "#666",
  fontsize: 18,
  height: 750,
  loop: "true",
  text: "Wyprzedaż rocznika 2022",
  textposition: "bottom",
  width: 1000,
}
