import {GildedRose, Item} from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should do a snapshot for 2 days', function () {
    const items: Item[] = [
      {name: "Aged Brie", daysLeftToSell: 2, quality: 0},
      {name: "Sulfuras, Hand of Ragnaros", daysLeftToSell: 0, quality: 80},
      {name: "Sulfuras, Hand of Ragnaros", daysLeftToSell: -1, quality: 80},
      {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 15, quality: 20},
      {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 10, quality: 49},
      {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 5, quality: 49}];

    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();
    gildedRose.updateQuality();

    expect(items).toMatchSnapshot();
  });

  it('should do a snapshot for 10 days', function () {
    const items: Item[] = [
      {name: "Aged Brie", daysLeftToSell: 2, quality: 0},
      {name: "Sulfuras, Hand of Ragnaros", daysLeftToSell: 0, quality: 80},
      {name: "Sulfuras, Hand of Ragnaros", daysLeftToSell: -1, quality: 80},
      {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 15, quality: 20},
      {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 10, quality: 49},
      {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 5, quality: 49}];

    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();

    expect(items).toMatchSnapshot();
  });
});
