/**
 * G30 Lianyungang–Khorgas Expressway
 * The Lianyungang–Khorgas Expressway (Chinese: 连云港－霍尔果斯高速公路),
 * commonly referred to as the Lianhuo Expressway (Chinese: 连霍高速公路),
 * is 4,243-kilometre-long expressway (2,636 mi) in the People"s Republic
 * of China that connects the cities of Lianyungang, in the province of Jiangsu,
 * and Khorgas, in the autonomous region of Xinjiang, on the border with
 * Kazakhstan. At Khorgas, there is a border crossing into Kazakhstan.
 * The expressway is the longest contiguous expressway in China with a single
 * numeric designation, stretching across the country from the Yellow Sea
 * on the east cost to the Kazakhstan border in the west. It passes through
 * the provinces of Jiangsu, Anhui, Henan, Shaanxi, Gansu, and Xinjiang.
 *
 * From Wikipedia, the free encyclopedia
 */
const LList = require("../lib/linked_list");

module.exports = function() {
    "use strict";
    var cities = new LList();

    // The expressway passes through the following cities:
    cities.append("Lianyungang, Jiangsu");
    cities.append("Xuzhou, Jiangsu");
    cities.append("Kaifeng, Henan");
    cities.append("Zhengzhou, Henan");
    cities.append("Weinan, Shaanxi");
    cities.append("Xi'an, Shaanxi");
    cities.append("Baoji, Shaanxi");
    cities.append("Tianshui, Gansu");
    cities.append("Lanzhou, Gansu");
    cities.append("Wuwei, Gansu");
    cities.append("Zhangye, Gansu");
    cities.append("Jiuquan, Gansu");
    cities.append("Hami, Xinjiang");
    cities.append("Ürümqi, Xinjiang");
    cities.append("Khorgas, Xinjiang");

    return cities.head;
};
