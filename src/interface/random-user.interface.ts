export interface randomUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
