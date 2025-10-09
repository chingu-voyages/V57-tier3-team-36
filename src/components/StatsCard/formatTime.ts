export function getSecondsSince(isoString: string): number {
  const then = new Date(isoString).getTime();
  const now = Date.now();
  return (now - then) / 1000;
}

export function formatTime(seconds: number) {
  const minutes = seconds / 60;
  const hours = seconds / 3600;
  const days = hours / 24;
  const weeks = days / 7;

  const toString = (value: number) => Math.round(value).toString();

  if (weeks > 3) {
    return ['+3', 'wks'] as const;
  }
  if (weeks >= 1) {
    return [toString(weeks), weeks === 1 ? 'week' : 'wks'] as const;
  }
  if (days >= 1) {
    return [toString(days), `day${days === 1 ? '' : 's'}`] as const;
  }
  if (hours >= 1) {
    return [toString(hours), `hr${hours === 1 ? '' : 's'}`] as const;
  }
  return [toString(minutes), `min${minutes === 1 ? '' : 's'}`] as const;
}
