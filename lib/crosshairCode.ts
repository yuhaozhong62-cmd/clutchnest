export type CrosshairCodeValidation = {
  valid: boolean;
  reasons: string[];
};

const allowedCharacters = /^[A-Za-z0-9.;]+$/;

export function validateValorantCrosshairCode(code: string): CrosshairCodeValidation {
  const reasons: string[] = [];

  if (!code) reasons.push("代码为空");
  if (code !== code.trim()) reasons.push("代码前后存在空格");
  if (/\r|\n/.test(code)) reasons.push("代码包含换行");
  if (code && !allowedCharacters.test(code)) reasons.push("代码包含不支持的字符");
  if (code && !code.includes(";")) reasons.push("代码没有使用分号分隔");
  if (code && !/(^|;)P(;|$)/.test(code)) reasons.push("代码缺少主准星配置段 P");
  if (code && code.length < 18) reasons.push("代码长度异常，可能已被截断");
  if (/[；，。]/.test(code)) reasons.push("代码包含中文标点");
  if (/&(?:amp|quot|#\d+);/i.test(code) || /<[^>]+>/.test(code)) reasons.push("代码可能混入网页内容");

  return { valid: reasons.length === 0, reasons };
}
