import {
  Home,
  Heart,
  Box,
  Archive,
  Scale,
  MapPin,
  Building2,
  Flower2,
} from "lucide-react";

/**
 * content/categories/*.md の frontmatter にある icon の値と、
 * lucide-react のアイコンコンポーネントの対応表。
 */
export const CATEGORY_ICONS = {
  shisetsu: Building2,
  kaigo: Heart,
  seizen: Box,
  ihin: Archive,
  souzoku: Scale,
  fudousan: Home,
  bochi: Flower2,
};

export function getCategoryIcon(iconKey) {
  return CATEGORY_ICONS[iconKey] || Home;
}

/**
 * エリアの大分類(都道府県)ごとのアイコン。
 */
export const REGION_ICONS = {
  "兵庫県": MapPin,
  "大阪府": Building2,
  "京都府": MapPin,
  "奈良県": MapPin,
  "滋賀県": MapPin,
  "和歌山県": MapPin,
};

export function getRegionIcon(region) {
  return REGION_ICONS[region] || MapPin;
}

/**
 * content/blog/*.md の frontmatter にある icon の値と、
 * lucide-react のアイコンコンポーネントの対応表。
 */
export const BLOG_ICONS = {
  shisetsu: Building2,
  kaigo: Heart,
  seizen: Box,
  ihin: Archive,
  souzoku: Scale,
  fudousan: Home,
  bochi: Flower2,
};

export function getBlogIcon(iconKey) {
  return BLOG_ICONS[iconKey] || Home;
}

export { MapPin };
