export const registerCustomAnimation = (data: string): Promise<string> => {
    const animationCode = data.replace("export {}", "")
    if (!animationCode.includes("registerAnimator") || !animationCode.includes("animationName")) {
        return Promise.reject(null)
    } else {
        eval(animationCode)
        return Promise.resolve(animationCode)
    }
}
export const getAnimationName = (animationCode: string): Promise<string> => {
    try {
        let animationName = animationCode.split("animationName = '")[1]
        animationName = animationName.split("';")[0]
        return Promise.resolve(animationName)
    } catch (e) {
        return Promise.reject(null)
    }
}
