type Product = 'Aged Brie' | 'Sulfuras, Hand of Ragnaros' | 'Backstage passes to a TAFKAL80ETC concert';

export class Item {
  name: Product;
  daysLeftToSell: number;
  quality: number;

  constructor(name, daysLeftToSell, quality) {
    this.name = name;
    this.daysLeftToSell = daysLeftToSell;
    this.quality = quality;
  }

  public decreaseSellIn() {
    this.daysLeftToSell = this.daysLeftToSell - 1;
  }

  public restartQuality() {
    this.quality = 0;
  }

  public increaseQuality() {
    this.quality = this.quality + 1;
  }

  public hasNotReachedTopQualityLevel() {
    return this.quality < 50;
  }

  public decreaseQuality() {
    this.quality = this.quality - 1;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let productName = this.items[i].name;
      if (productName == 'Backstage passes to a TAFKAL80ETC concert') {
        GildedRose.updateConcertTicketsQuality(this.items[i]);
        continue;
      }

      if (productName == 'Aged Brie') {
        GildedRose.updateAgedBrieQuality(this.items[i]);
        continue;
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        GildedRose.decreaseOtherProductsQuality(this.items[i]);
      }
    }

    return this.items;
  }

  private static decreaseOtherProductsQuality(item: Item) {
    if (item.quality > 0) {
      item.decreaseQuality();
    }
    item.decreaseSellIn();
    let hasPassedSellingDate = item.daysLeftToSell < 0;
    if (hasPassedSellingDate && item.quality > 0) {
      item.decreaseQuality();
    }
  }

  private static updateConcertTicketsQuality(item: Item) {
    if (item.hasNotReachedTopQualityLevel()) {
      item.increaseQuality();
      if (GildedRose.isTheConcertDueInLessThan(11, item)) {
        item.increaseQuality();
      }
      if (GildedRose.isTheConcertDueInLessThan(6, item)) {
        item.increaseQuality();
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.decreaseSellIn();
    }
    const hasPassedSellingDate = item.daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      item.restartQuality();
    }
  }

  private static updateAgedBrieQuality(item: Item) {
    if (item.hasNotReachedTopQualityLevel()) {
      item.increaseQuality();
    }
    item.decreaseSellIn();
    let hasPassedSellingDate = item.daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      if (item.hasNotReachedTopQualityLevel()) {
        item.increaseQuality();
      }
    }
  }

  private static isTheConcertDueInLessThan(days: number, item: Item) {
    return item.daysLeftToSell < days
      && item.hasNotReachedTopQualityLevel();
  }
}
