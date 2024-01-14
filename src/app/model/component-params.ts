export interface ComponentParams {
  background: string
  matchParent: boolean
  height: number
  width: number
  animations: object[]
}

export const DEFAULT_CUSTOM_PARAMS: object = {
  color: 'black',
}

export const DEFAULT_ANIMATION_PARAMS: object = {
  animationName: 'slide-text',
  text: 'Hello slide text animation!',
  textposition: 'top',
  color: 'black',
  startAt: 0,
  fontsize: 24,
  speed: 4,
  url: "https://www.euro.com.pl/golarki/philips-oneblade-pro-qp6530-15.bhtml",
  loop: false
}

export const DEFAULT_COMPONENT_PARAMS: ComponentParams = {
  background: "url('assets/media/corollaSedan_1000x750.jpg')",
  matchParent: false,
  height: 750,
  width: 1000,
  animations: [{...DEFAULT_ANIMATION_PARAMS}]
}

