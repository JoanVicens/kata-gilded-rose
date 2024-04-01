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
  }

  private decrementItemQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  private decreaseItemSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

  private updateItemQuality(item: Item): void {
    if (item.name === "Aged Brie") {
      this.updateAgedBrie(item);
      return;
    }

    if (item.name === "Sulfuras, Hand of Ragnaros") {
      this.updateSulfuras(item);
      return;
    }

    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.updateBackstagePasses(item);
      return;
    }

    this.decrementItemQuality(item);

    this.decreaseItemSellIn(item);

    if (item.sellIn < 0) {
      this.decrementItemQuality(item);
    }
  }
  private updateBackstagePasses(backstagePasses: Item) {
    if (backstagePasses.quality < GildedRose.MAX_ITEM_QUALITY) {
      backstagePasses.quality += 1;

      if (backstagePasses.sellIn < 11) {
        backstagePasses.quality += 1;
      }
      if (backstagePasses.sellIn < 6) {
        backstagePasses.quality += 1;
      }

      if (backstagePasses.quality > GildedRose.MAX_ITEM_QUALITY) {
        backstagePasses.quality = GildedRose.MAX_ITEM_QUALITY;
      }
    }

    backstagePasses.sellIn = backstagePasses.sellIn - 1;

    if (backstagePasses.sellIn < 0) {
      backstagePasses.quality = 0;
    }
  }
  private updateSulfuras(sulfuras: Item) {}

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
