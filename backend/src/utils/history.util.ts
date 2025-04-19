export function getLastCompletedDate(dates: string[]): string | null {
    if (!dates.length) return null;
  
    return [...dates].sort((a, b) => b.localeCompare(a))[0]; // latest ISO string
  }
  