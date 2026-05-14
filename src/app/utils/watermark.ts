/**
 * Utility to generate professional watermarks for user-generated content
 * and social sharing descriptions.
 */

export function getWatermark(userName: string = 'User'): string {
  const websiteName = 'CareerDream.in';
  const timestamp = new Date().toLocaleDateString('en-IN');
  return `\n\n--- \nVerified by ${userName} via ${websiteName} | ${timestamp}`;
}

/**
 * Appends a professional watermark to a social sharing message.
 */
export function formatShareMessage(title: string, userName: string): string {
  const websiteName = 'CareerDream.in';
  return `${title}\n\nShared by ${userName} on ${websiteName}`;
}

/**
 * Overlay watermark text for display purposes (CSS/Visual overlay)
 */
export const WATERMARK_STYLE = "text-[10px] font-black uppercase tracking-[0.2em] opacity-20 pointer-events-none select-none";
