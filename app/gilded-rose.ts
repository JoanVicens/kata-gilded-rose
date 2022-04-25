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
      if (productName == 'Aged Brie' || productName == 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.hasNotReachedTopQualityLevel(i)) {
          this.increaseQuality(i);
          if (this.isTheConcertDueInLessThan(11, productName, i)) {
            this.increaseQuality(i);
          }
          if (this.isTheConcertDueInLessThan(6, productName, i)) {
            this.increaseQuality(i);
          }
        }
      } else {
        this.decreaseQuality(i);
      }
      if (productName != 'Sulfuras, Hand of Ragnaros') {
        this.decreaseSellIn(i);
      }
      let hasPassedSellingDate = this.items[i].daysLeftToSell < 0;
      if (hasPassedSellingDate) {
        if (productName == 'Aged Brie') {
          if (this.hasNotReachedTopQualityLevel(i)) {
            this.increaseQuality(i);
          }
        } else if (productName == 'Backstage passes to a TAFKAL80ETC concert') {
          this.restartQuality(i);
        } else {
          this.decreaseQuality(i);
        }
      }
    }

    return this.items;
  }

  private isTheConcertDueInLessThan(days: number, productName: Product, i: number) {
    return productName == 'Backstage passes to a TAFKAL80ETC concert'
      && this.items[i].daysLeftToSell < days
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

  private decreaseSellIn(i: number) {
    this.items[i].daysLeftToSell = this.items[i].daysLeftToSell - 1;
  }

  private restartQuality(i: number) {
    this.items[i].quality = this.items[i].quality - this.items[i].quality;
  }

  private increaseQuality(i: number) {
    this.items[i].quality = this.items[i].quality + 1;
  }
}
