export const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export const generateId = (): string => {
  return 'animated-banner-' + Math.random().toString(36).substr(2, 9)
}

export const wait = (ms: number) => new Promise(res => setTimeout(res, ms))
