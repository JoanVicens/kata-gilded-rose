type Product = 'Aged Brie' | 'Sulfuras, Hand of Ragnaros' | 'Backstage passes to a TAFKAL80ETC concert';

export interface Item {
  name: Product;
  daysLeftToSell: number;
  quality: number;
}

const decreaseSellIn = (item: Item) => {
  item.daysLeftToSell = item.daysLeftToSell - 1;
};

const restartQuality = (item: Item) => {
  item.quality = 0;
};

const increaseQuality = (item: Item) => {
  item.quality = item.quality + 1;
};

const hasNotReachedTopQualityLevel = (item: Item) => item.quality < 50;

const decreaseQuality = (item: Item) => {
  item.quality = item.quality - 1;
};

const decreaseOtherProductsQuality = (item: Item) => {
  if (item.quality > 0) {
    decreaseQuality(item);
  }
  decreaseSellIn(item);
  let hasPassedSellingDate = item.daysLeftToSell < 0;
  if (hasPassedSellingDate && item.quality > 0) {
    decreaseQuality(item);
  }
};

const isTheConcertDueInLessThan = (item: Item, days: number) => item.daysLeftToSell < days
  && hasNotReachedTopQualityLevel(item);

const updateConcertTicketsQuality = (item: Item) => {
  if (hasNotReachedTopQualityLevel(item)) {
    increaseQuality(item);
    if (isTheConcertDueInLessThan(item, 11)) {
      increaseQuality(item);
    }
    if (isTheConcertDueInLessThan(item, 6)) {
      increaseQuality(item);
    }
  }
  if (item.name != 'Sulfuras, Hand of Ragnaros') {
    decreaseSellIn(item);
  }
  const hasPassedSellingDate = item.daysLeftToSell < 0;
  if (hasPassedSellingDate) {
    restartQuality(item);
  }
};

const updateAgedBrieQuality = (item: Item) => {
  if (hasNotReachedTopQualityLevel(item)) {
    increaseQuality(item);
  }
  decreaseSellIn(item);
  let hasPassedSellingDate = item.daysLeftToSell < 0;
  if (hasPassedSellingDate) {
    if (hasNotReachedTopQualityLevel(item)) {
      increaseQuality(item);
    }
  }
};

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
        updateConcertTicketsQuality(item);
        continue;
      }

      if (productName == 'Aged Brie') {
        updateAgedBrieQuality(item);
        continue;
      }

      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        decreaseOtherProductsQuality(item);
      }
    }

    return this.items;
  }
}
