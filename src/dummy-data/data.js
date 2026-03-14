import { faker } from "@faker-js/faker";
export const randomName = () => faker.person.fullName();
export const randomPics = () => faker.image.avatar();
export const randomCustomAlbumName = () => {
  // Tạo 1 chuỗi gồm 1-3 từ ngẫu nhiên
  const words = faker.lorem.words({ min: 1, max: 3 });

  // Viết hoa chữ cái đầu tiên của mỗi từ để trông giống tên Album
  return words.replace(/\b\w/g, (char) => char.toUpperCase());
};