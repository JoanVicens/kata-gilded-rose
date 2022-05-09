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

  public decreaseOtherProductsQuality() {
    if (this.quality > 0) {
      this.decreaseQuality();
    }
    this.decreaseSellIn();
    let hasPassedSellingDate = this.daysLeftToSell < 0;
    if (hasPassedSellingDate && this.quality > 0) {
      this.decreaseQuality();
    }
  }

  public updateConcertTicketsQuality() {
    if (this.hasNotReachedTopQualityLevel()) {
      this.increaseQuality();
      if (this.isTheConcertDueInLessThan(11)) {
        this.increaseQuality();
      }
      if (this.isTheConcertDueInLessThan(6)) {
        this.increaseQuality();
      }
    }
    if (this.name != 'Sulfuras, Hand of Ragnaros') {
      this.decreaseSellIn();
    }
    const hasPassedSellingDate = this.daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      this.restartQuality();
    }
  }

  public updateAgedBrieQuality() {
    if (this.hasNotReachedTopQualityLevel()) {
      this.increaseQuality();
    }
    this.decreaseSellIn();
    let hasPassedSellingDate = this.daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      if (this.hasNotReachedTopQualityLevel()) {
        this.increaseQuality();
      }
    }
  }

  private isTheConcertDueInLessThan(days: number) {
    return this.daysLeftToSell < days
      && this.hasNotReachedTopQualityLevel();
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      let productName = item.name;
      if (productName == 'Backstage passes to a TAFKAL80ETC concert') {
        item.updateConcertTicketsQuality();
        continue;
      }

      if (productName == 'Aged Brie') {
        item.updateAgedBrieQuality();
        continue;
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.decreaseOtherProductsQuality();
      }
    }

    return this.items;
  }
}
