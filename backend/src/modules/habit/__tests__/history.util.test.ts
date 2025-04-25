import { getLastCompletedDate } from "../utils/history.util";
import { format, subDays, parseISO } from "date-fns";

describe("getLastCompletedDate", () => {
  it("should return null for empty dates array", () => {
    expect(getLastCompletedDate([])).toBeNull();
  });

  it("should return the latest date for a single date", () => {
    const today = new Date();
    const todayStr = format(today, "yyyy-MM-dd");
    const result = getLastCompletedDate([todayStr]);
    expect(result).toBe(todayStr);
  });

  it("should return the latest date from multiple dates", () => {
    const today = new Date();
    const dates = [
      format(subDays(today, 2), "yyyy-MM-dd"),
      format(subDays(today, 1), "yyyy-MM-dd"),
      format(today, "yyyy-MM-dd"),
    ];
    const result = getLastCompletedDate(dates);
    expect(result).toBe(format(today, "yyyy-MM-dd"));
  });

  it("should handle dates in any order", () => {
    const today = new Date();
    const dates = [
      format(subDays(today, 5), "yyyy-MM-dd"),
      format(subDays(today, 2), "yyyy-MM-dd"),
      format(subDays(today, 8), "yyyy-MM-dd"),
    ];
    const result = getLastCompletedDate(dates);
    const expected = format(subDays(today, 2), "yyyy-MM-dd");
    expect(result).toBe(expected);
  });

  it("should return date in YYYY-MM-DD format", () => {
    const today = new Date();
    const dates = [format(today, "yyyy-MM-dd")];
    const result = getLastCompletedDate(dates);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("should handle dates with timezone differences", () => {
    const dates = ["2024-04-22T00:00:00.000Z", "2024-04-21T23:59:59.999Z"];
    const result = getLastCompletedDate(dates);
    expect(result).toBe("2024-04-22");
  });
}); 