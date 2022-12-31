export type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  thumbnail?: {
    src: string;
    alt: string;
    format?: 'jpeg' | 'jpg' | 'png' | 'webp';
    width?: number;
    height?: number;
    aspectRatio?: `${number}:${number}`;
  };
};

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  thumbnail?: {
    src: string;
    alt: string;
    format?: 'jpeg' | 'jpg' | 'png' | 'webp';
    width?: number;
    height?: number;
    aspectRatio?: `${number}:${number}`;
  };
};
