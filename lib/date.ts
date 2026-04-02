export function parseFrenchDate(dateStr: string): Date {
  const months: { [key: string]: number } = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const parts = dateStr.toLowerCase().split(" ");
  if (parts.length !== 3) return new Date();

  const day = parseInt(parts[0], 10);
  const month = months[parts[1]];
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}
