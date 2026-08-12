import { faker } from "@faker-js/faker";

export class RandomDataGenerator {
  static generateRandomEmail(firstName: string, lastName: string): string {
    return faker.internet.email({
      firstName: firstName,
      lastName: lastName,
      provider: "example.com",
    });
  }

  static generateRandomPassword(): string {
    return faker.internet.password({
      length: 8,
      memorable: true,
      pattern: /[A-Za-z0-9]/,
    });
  }

  static generateRandomFirstName(): string {
    return faker.person.firstName();
  }

  static generateRandomLastName(): string {
    return faker.person.lastName();
  }
}
