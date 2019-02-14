import { trimTimeComponentFromISOString} from "../dateUtil";

describe("Date Utils", () => {

  it('trim time component should strip time component from date', () => {
    expect(trimTimeComponentFromISOString("1994-01-01T00:00:00.000-0500")).toBe('1994-01-01');
  });

  it('trim time component should be null safe', () => {
    expect(trimTimeComponentFromISOString(null)).toBe(null);
  });

});
