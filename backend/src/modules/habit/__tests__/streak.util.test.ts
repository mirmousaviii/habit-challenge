import { calculateStreak } from "../utils/streak.util";
import { addDays, subDays, format } from "date-fns";

describe("calculateStreak", () => {
  it("should return 0 for empty dates array", () => {
    expect(calculateStreak([])).toBe(0);
  });

  it("should return 1 for today's date only", () => {
    const today = format(new Date(), "yyyy-MM-dd");
    expect(calculateStreak([today])).toBe(1);
  });

  it("should return correct streak for consecutive days", () => {
    const today = new Date();
    const dates = [
      format(today, "yyyy-MM-dd"),
      format(subDays(today, 1), "yyyy-MM-dd"),
      format(subDays(today, 2), "yyyy-MM-dd"),
    ];
    expect(calculateStreak(dates)).toBe(3);
  });

  it("should return 1 for non-consecutive days", () => {
    const today = new Date();
    const dates = [
      format(today, "yyyy-MM-dd"),
      format(subDays(today, 2), "yyyy-MM-dd"),
      format(subDays(today, 4), "yyyy-MM-dd"),
    ];
    expect(calculateStreak(dates)).toBe(1);
  });

  it("should return 0 for future dates", () => {
    const today = new Date();
    const dates = [
      format(addDays(today, 1), "yyyy-MM-dd"),
      format(addDays(today, 2), "yyyy-MM-dd"),
    ];
    expect(calculateStreak(dates)).toBe(0);
  });

  it("should handle dates in any order", () => {
    const today = new Date();
    const dates = [
      format(subDays(today, 2), "yyyy-MM-dd"),
      format(today, "yyyy-MM-dd"),
      format(subDays(today, 1), "yyyy-MM-dd"),
    ];
    expect(calculateStreak(dates)).toBe(3);
  });
}); 