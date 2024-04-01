import { Item } from "./Item";

export class GildedRose {
  private static readonly MAX_ITEM_QUALITY = 50;
  private static readonly BACK_STAGE_QUALITY_INCREASE = 1;
  private static readonly AGED_BRIE_NORMAL_QUALITY_INCREASE = 1;
  private static readonly AGED_BRIE_EXPIRED_QUALITY_INCREASE = 2;

  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private incrementItemQualityBy(item: Item, amount: number): void {
    if (item.quality + amount >= GildedRose.MAX_ITEM_QUALITY) {
      item.quality = GildedRose.MAX_ITEM_QUALITY;
      return;
    }

    item.quality += amount;
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
    this.incrementItemQualityBy(
      backstagePasses,
      GildedRose.BACK_STAGE_QUALITY_INCREASE
    );

    if (backstagePasses.sellIn < 11) {
      this.incrementItemQualityBy(
        backstagePasses,
        GildedRose.BACK_STAGE_QUALITY_INCREASE
      );
    }
    if (backstagePasses.sellIn < 6) {
      this.incrementItemQualityBy(
        backstagePasses,
        GildedRose.BACK_STAGE_QUALITY_INCREASE
      );
    }

    backstagePasses.sellIn = backstagePasses.sellIn - 1;

    if (backstagePasses.sellIn < 0) {
      backstagePasses.quality = 0;
    }
  }
  private updateSulfuras(sulfuras: Item) {}

  private updateAgedBrie(agedBrie: Item) {
    const increaseBy =
      agedBrie.sellIn <= 0
        ? GildedRose.AGED_BRIE_EXPIRED_QUALITY_INCREASE
        : GildedRose.AGED_BRIE_NORMAL_QUALITY_INCREASE;

    this.incrementItemQualityBy(agedBrie, increaseBy);

    agedBrie.sellIn = agedBrie.sellIn - 1;
  }

  updateQuality() {
    this.items.forEach((item) => this.updateItemQuality(item));

    return this.items;
  }
}
