const Item = require("./Item");

class Shop {
  Sulfuras = 'Sulfuras, Hand of Ragnaros';
  Backstage_Passes = 'Backstage passes to a TAFKAL80ETC concert';
  Aged_Brie = 'Aged Brie';
  Conjured = 'Conjured';
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(function (item, index, itemArray) {
      if (item.name !== Shop.Sulfuras)
        item.sellIn--;
      switch( item.name ) {
        case Shop.Sulfuras: break;
        case Shop.Aged_Brie: item.quality += (item.sellIn<0?2:1); break;
        case Shop.Backstage_Passes:
          if (item.sellIn < 0) {
            item.quality = 0;
          } else {
            item.quality += 3 - Math.min(2, Math.floor(item.sellIn / 5));
          }
          break;
        case Shop.Conjured: item.quality -= (item.sellIn<0?4:2);
        default: item.quality -= (item.sellIn<0?2:1); break;
      }
      // Clamp value to valid range
      item.quality = Math.min(Math.max(0, item.quality), 50);
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
