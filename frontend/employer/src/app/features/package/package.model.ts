export enum PackageType {
  CV,
  Post
}

export interface Pkage {
  id: number;
  name: string;
  price: number;
  duration: number;
  isFeatured: boolean;
  isSupport: boolean;
  packageType: PackageType;
}
