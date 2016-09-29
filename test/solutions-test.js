/*global
    describe it before
*/
const G4 = require("./G4"); // a linked list with loop
const G30 = require("./G30"); // a linked list without loop
var hasloop;

/**
 * Mark Each Node
 *
 * Traverse the list and mark each node as having been seen.
 * If you come to a node that has already been marked, then you know that the list has a loop.
 * The problem with this solution is that all nodes' `seen` properties are set to true.
 */
describe("Mark Each Node", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var current = head;
            do {
                if (current.seen) {
                    return true;
                }
                current.seen = true;
                current = current.next;
            } while (current);
            return false;
        };
    });
    it("should return true when input is G4", function () {
        hasloop(G4.head)
            .should.be.equal(true);
    });
    it("should return false when input is G30", function () {
        hasloop(G30.head)
            .should.be.equal(false);
    });
});

/**
 * Keep a hash set of all nodes seen so far
 *
 * O(n) time complexity, O(n) space complexity
 *
 * Keeping a set of all the nodes have seen so far and
 * testing to see if the next node is in that set would
 * be a perfectly correct solution. It would run fast
 * as well. However it would use enough extra space to
 * make a copy of the linked list. Allocating that much
 * memory is prohibitively expensive for large lists.
 */
describe("Keep a hash set of all nodes seen so far", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var nodes = new Set();
            var current = head;

            do {
                if (nodes.has(current)) {
                    return true;
                }
                nodes.add(current);
                current = current.next;
            } while (current);
            return false;
        };
    });
    it("should return true when input is G4", function () {
        hasloop(G4.head)
            .should.be.equal(true);
    });
    it("should return false when input is G30", function () {
        hasloop(G30.head)
            .should.be.equal(false);
    });
});

/**
 * Use a doubly linked list
 *
 * O(n) time complexity
 *
 * Doubly linked lists make it easy to tell if there is a loop.
 * If you encounter any node that doesn’t link to the last node
 * you visited, you know that there are two nodes linking to
 * that node. Because the back links could be initially messed
 * up in some other way, this algorithm is only correct if you
 * can trust the back links. Otherwise it is just a malformed
 * doubly linked list finder. The singly linked list can even
 * be converted into a doubly linked list with little additional
 * work. Again this will require that we change the structure of
 * the Node to accommodate a second link. Something that may not
 * be possible in all cases. Usually a singly linked list is used
 * because the amount of space to allocate for each node is at a
 * premium.
 */
describe("Use a doubly linked list", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var current = head;
            var previous = null;
            do {
                if (previous && current.previous && previous !== current.previous) {
                    return true;
                }
                if (current.previous === undefined) {
                    current.previous = current;
                }
                previous = current;
                current = current.next;
            } while (current);
            return false;
        };
    });
    it("should return true when input is G4", function () {
        hasloop(G4.head)
            .should.be.equal(true);
    });
    it("should return false when input is G30", function () {
        hasloop(G30.head)
            .should.be.equal(false);
    });
});
