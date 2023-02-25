export const AppService = {
  getBirthdays: async (month: number, day: number) => {
    try {
      const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`);
      const birthdays = await response.json();
      return birthdays.births;
    } catch (err) {
      console.error(err);
    }
  }
}