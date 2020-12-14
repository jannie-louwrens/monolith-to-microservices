export interface CategoryInfo {
  id: number;
  name: string;
  parent?: number;
  children?: CategoryInfo[];
  categoryParent?: CategoryInfo,
  created: Date,
  updated?: Date
}
