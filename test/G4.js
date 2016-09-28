/**
 * G4 Beijing–Hong Kong–Macau Expressway
 * The Beijing–Hong Kong–Macau Expressway (Chinese: 北京－香港－澳门高速公路),
 * commonly referred to as the Jinggang'ao Expressway (Chinese: 京港澳高速公路)
 * is a 2,272.65-kilometre-long expressway (1,412.16 mi) that connects the
 * Chinese cities of Beijing and Shenzhen, in Guangdong province, at the border
 * with Hong Kong. The expressway terminates at the Huanggang Port Control
 * Point in Shenzhen, opposite the Lok Ma Chau border control point in Hong Kong.
 * The connection to Zhuhai at the Macau border is made using the spur line G4W
 * Guangzhou–Macau Expressway, which branches off from the main line in Guangzhou.
 * When the expressway was completed in October 2004, it was China's first
 * completed north-south expressway route.
 *
 * From Wikipedia, the free encyclopedia
 */
'use strict';


const LList = require('./lib/linked_list');

var cities = new LList();
var gz;
var mo;

// The expressway passes through the following cities:
cities.append("Beijing");
cities.append("Baoding, Hebei");
cities.append("Shijiazhuang, Hebei");
cities.append("Handan, Hebei");
cities.append("Xinxiang, Henan");
cities.append("Zhengzhou, Henan");
cities.append("Luohe, Henan");
cities.append("Xinyang, Henan");
cities.append("Wuhan, Hubei");
cities.append("Xianning, Hubei");
cities.append("Yueyang, Hunan");
cities.append("Changsha, Hunan");
cities.append("Zhuzhou, Hunan");
cities.append("Hengyang, Hunan");
cities.append("Chenzhou, Hunan");
cities.append("Shaoguan, Guangdong");
gz = cities.append("Guangzhou, Guangdong");
cities.append("Shenzhen, Guangdong");
cities.append("Hong Kong");
mo = cities.append("Macau");
mo.next = gz;

module.exports = cities;
