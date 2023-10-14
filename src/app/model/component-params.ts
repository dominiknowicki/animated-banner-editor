export interface ComponentParams {
  animation: string
  width: number
  height: number
  matchParent: boolean
  background: string
  text: string
}

export const DEFAULT_PARAMS: ComponentParams = {
  animation: "slide-right",
  width: 1000,
  height: 750,
  matchParent: false,
  background: "url('assets/media/corollaSedan_1000x750.jpg')",
  text: "Wyprzedaż rocznika 2022",
}

export const COMPONENT_PARAMS: string[] = ['text', 'animation', 'width', 'height', 'matchParent', 'background']
