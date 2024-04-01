import { Item } from "./Item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private incrementItemQuality(item: Item): void {
    if (item.quality >= 50) {
      return;
    }

    item.quality += 1;
  }

  private decrementItemQuality(item: Item): void {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
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
    } else if (item.quality < 50) {
      this.incrementItemQuality(item);
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 11) {
          this.incrementItemQuality(item);
        }
        if (item.sellIn < 6) {
          this.incrementItemQuality(item);
        }
      }
    }

    this.decreaseItemSellIn(item);

    if (item.sellIn < 0) {
      if (item.name != "Aged Brie") {
        this.decrementItemQuality(item);
      } else {
        this.incrementItemQuality(item);
      }
    }
  }

  updateQuality() {
    this.items.forEach((item) => this.updateItemQuality(item));

    return this.items;
  }
}
