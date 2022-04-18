type rose = 'Aged Brie' | 'Sulfuras, Hand of Ragnaros' | 'Backstage passes to a TAFKAL80ETC concert';

export class Item {
  name: rose;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let roseName = this.items[i].name;
      if (roseName == 'Aged Brie' || roseName == 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (roseName == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(i);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(i);
              }
            }
          }
        }
      } else {
        this.decreaseQuality(i);
      }
      if (roseName != 'Sulfuras, Hand of Ragnaros') {
        this.decreaseSellIn(i);
      }
      if (this.items[i].sellIn < 0) {
        if (roseName != 'Aged Brie') {
          if (roseName != 'Backstage passes to a TAFKAL80ETC concert') {
            this.decreaseQuality(i)
          } else {
            this.restartQuality(i);
          }
        } else {
          if (this.items[i].quality < 50) {
            this.increaseQuality(i);
          }
        }
      }
    }

    return this.items;
  }

  private decreaseQuality(i: number) {
    if (this.items[i].quality > 0) {
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].quality = this.items[i].quality - 1
      }
    }
  }

  private decreaseSellIn(i: number) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
  }

  private restartQuality(i: number) {
    this.items[i].quality = this.items[i].quality - this.items[i].quality
  }

  private increaseQuality(i: number) {
    this.items[i].quality = this.items[i].quality + 1
  }
}
