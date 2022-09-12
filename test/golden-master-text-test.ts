import {Item, updateQuality} from '@/gilded-rose';

const items: Item[] = [
  {name: "Aged Brie", daysLeftToSell: 2, quality: 0},
  {name: "Sulfuras, Hand of Ragnaros", daysLeftToSell: 0, quality: 80},
  {name: "Sulfuras, Hand of Ragnaros", daysLeftToSell: -1, quality: 80},
  {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 15, quality: 20},
  {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 10, quality: 49},
  {name: "Backstage passes to a TAFKAL80ETC concert", daysLeftToSell: 5, quality: 49}];

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ' ' + element.daysLeftToSell + ' ' + element.quality);

  });
  console.log();
  updateQuality(items);
}
