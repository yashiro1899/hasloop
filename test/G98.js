/**
 * G98 Hainan Ring Expressway
 * The Hainan Ring Expressway (Chinese: 海南地区环线高速公路)
 * is a 612.8-kilometre-long orbital expressway (380.8 mi) that
 * encircles the island of Hainan in the People's Republic of
 * China. It consists of two sections, which were originally
 * separate, the Hainan East Line Expressway (Chinese: 海南东线高速公路)
 * and the Hainan West Line Expressway (Chinese: 海南西线高速公路).
 * Both sections begin in Haikou and terminate in Sanya, thus
 * forming a ring or loop.
 *
 * From Wikipedia, the free encyclopedia
 */
const LList = require("../lib/linked_list");

var cities = new LList();
var hk;
var cm;

// The expressway passes through the following cities:
hk = cities.append("Haikou");
cities.append("Ding'an County");
cities.append("Qionghai");
cities.append("Wanning");
cities.append("Lingshui Li Autonomous County");
cities.append("Sanya");
cities.append("Ledong Li Autonomous County");
cities.append("Dongfang");
cities.append("Changjiang Li Autonomous County");
cities.append("Danzhou");
cities.append("Lingao County");
cm = cities.append("Chengmai County");
cm.next = hk;

module.exports = cities;
