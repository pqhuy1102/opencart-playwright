import { faker } from "@faker-js/faker";

export class RandomDataGenerator {
  static generateRandomEmail(): string {
    return faker.internet.email({
      firstName: "Tom",
      lastName: "Jerry",
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
}
