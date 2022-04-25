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
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // ToDo. First of all: READ THE BLOODY README.md
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let productName = this.items[i].name;
      if (productName == 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateConcertTicketsQuality(i);
        continue;
      }

      if (productName == 'Aged Brie') {
        this.updateAgedBrie(i);
        continue;
      }

      this.decreaseOtherProductsQuality(i);
    }

    return this.items;
  }

  private decreaseOtherProductsQuality(i: number) {
    this.decreaseQuality(i);
    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      this.items[i].decreaseSellIn();
    }
    let hasPassedSellingDate = this.items[i].daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      this.decreaseQuality(i);
    }
  }

  private updateConcertTicketsQuality(i: number) {
    if (this.hasNotReachedTopQualityLevel(i)) {
      this.items[i].increaseQuality();
      if (this.isTheConcertDueInLessThan(11, i)) {
        this.items[i].increaseQuality();
      }
      if (this.isTheConcertDueInLessThan(6, i)) {
        this.items[i].increaseQuality();
      }
    }
    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      this.items[i].decreaseSellIn();
    }
    const hasPassedSellingDate = this.items[i].daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      this.items[i].restartQuality();
    }
  }

  private updateAgedBrie(i: number) {
    if (this.hasNotReachedTopQualityLevel(i)) {
      this.items[i].increaseQuality();
    }
    this.items[i].decreaseSellIn();
    let hasPassedSellingDate = this.items[i].daysLeftToSell < 0;
    if (hasPassedSellingDate) {
      if (this.hasNotReachedTopQualityLevel(i)) {
        this.items[i].increaseQuality();
      }
    }
  }

  private isTheConcertDueInLessThan(days: number, i: number) {
    return this.items[i].daysLeftToSell < days
      && this.hasNotReachedTopQualityLevel(i);
  }

  private hasNotReachedTopQualityLevel(i: number) {
    return this.items[i].quality < 50;
  }

  private decreaseQuality(i: number) {
    if (this.items[i].quality > 0) {
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].quality = this.items[i].quality - 1;
      }
    }
  }
}
