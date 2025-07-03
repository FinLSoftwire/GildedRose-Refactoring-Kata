const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("Should age", function() {
    const gildedRose = new Shop([new Item("foo", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(9);
  });
  it("Should expire (age faster past sellIn)", function() {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });
  it("Should age well (Brie improves with time)", function() {
    const gildedRose = new Shop([new Item('Aged Brie', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
  });
  it("Should age really well (Brie improves twice as fast once past its sellIn)", function() {
    const gildedRose = new Shop([new Item(Shop.Aged_Brie, 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(12);
  });
  it("Quality is capped at 50", function() {
    const gildedRose = new Shop([new Item(Shop.Aged_Brie, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(50);
  });
  it("... and at 0", function() {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
  it("Sulfuras holds its quality and doesn't age", function() {
    const gildedRose = new Shop([new Item(Shop.Sulfuras, 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });
  it("Sulfuras always has quality 80", function() {
    const gildedRose = new Shop([new Item(Shop.Sulfuras, 0, 70)]);
    expect(() => {gildedRose.updateQuality()}).toThrowError();
  });
  it("Backstage passes gain quality closer to the show", function() {
    const gildedRose = new Shop([new Item(Shop.Backstage_Passes, 20, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(11);
  });
  it("Backstage passes gain quality closer to the show", function() {
    const gildedRose = new Shop([new Item(Shop.Backstage_Passes, 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
  });
});
