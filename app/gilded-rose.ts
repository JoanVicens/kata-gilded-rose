import { Item } from "./Item";

export class GildedRose {
  private static readonly MAX_ITEM_QUALITY = 50;
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private incrementItemQuality(item: Item): void {
    if (item.quality >= GildedRose.MAX_ITEM_QUALITY) {
      return;
    }

    if (item.name === "Aged Brie" && item.sellIn <= 0) {
      item.quality += 2;

      return;
    }

    item.quality += 1;

    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 11) {
        item.quality += 1;
      }
      if (item.sellIn < 6) {
        item.quality += 1;
      }

      if (item.quality > GildedRose.MAX_ITEM_QUALITY) {
        item.quality = GildedRose.MAX_ITEM_QUALITY;
      }
    }
  }

  private decrementItemQuality(item: Item): void {
    if (
      item.name === "Sulfuras, Hand of Ragnaros" ||
      item.name === "Aged Brie"
    ) {
      return;
    }

    if (
      item.name === "Backstage passes to a TAFKAL80ETC concert" &&
      item.sellIn < 0
    ) {
      item.quality = 0;
      return;
    }

    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  private decreaseItemSellIn(item: Item): void {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      item.sellIn = item.sellIn - 1;
    }
  }

  private updateItemQuality(item: Item): void {
    if (
      item.name != "Aged Brie" &&
      item.name != "Backstage passes to a TAFKAL80ETC concert" &&
      item.name != "Sulfuras, Hand of Ragnaros"
    ) {
      this.decrementItemQuality(item);
    } else if (item.quality < GildedRose.MAX_ITEM_QUALITY) {
      this.incrementItemQuality(item);
    }

    this.decreaseItemSellIn(item);

    if (item.sellIn < 0) {
      this.decrementItemQuality(item);
    }
  }

  updateQuality() {
    this.items.forEach((item) => this.updateItemQuality(item));

    return this.items;
  }
}
