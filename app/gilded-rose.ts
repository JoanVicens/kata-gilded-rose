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

    item.quality += 1;

    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
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
    if (item.name === "Aged Brie") {
      this.updateAgedBrie(item);
      return;
    }

    if (
      item.name === "Backstage passes to a TAFKAL80ETC concert" ||
      item.name === "Sulfuras, Hand of Ragnaros"
    ) {
      if (item.quality < GildedRose.MAX_ITEM_QUALITY) {
        this.incrementItemQuality(item);
      }
    } else {
      this.decrementItemQuality(item);
    }

    this.decreaseItemSellIn(item);

    if (item.sellIn < 0) {
      this.decrementItemQuality(item);
    }
  }
  private updateAgedBrie(agedBrie: Item) {
    if (agedBrie.quality < GildedRose.MAX_ITEM_QUALITY) {
      const increaseBy = agedBrie.sellIn <= 0 ? 2 : 1;
      agedBrie.quality += increaseBy;
    }

    agedBrie.sellIn = agedBrie.sellIn - 1;
  }

  updateQuality() {
    this.items.forEach((item) => this.updateItemQuality(item));

    return this.items;
  }
}
