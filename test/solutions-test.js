/*global
    describe it before after
*/
var G4 = require("./G4"); // a linked list with loop
var G30 = require("./G30"); // a linked list without loop
var G98 = require("./G98"); // a linked linked with full loop where the last node links to the first
var hasloop;

function reload() {
    "use strict";
    delete require.cache[require.resolve("./G4")];
    delete require.cache[require.resolve("./G30")];
    delete require.cache[require.resolve("./G98")];
    G4 = require("./G4");
    G30 = require("./G30");
    G98 = require("./G98");
}

function its() {
    "use strict";
    it("should return true when loop is present", function () {
        hasloop(G4.head)
            .should.be.equal(true);
    });
    it("should return true when full loop is present", function () {
        hasloop(G98.head)
            .should.be.equal(true);
    });
    it("should return false when loop is not present", function () {
        hasloop(G30.head)
            .should.be.equal(false);
    });
}

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
    its();
    after(reload);
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
    its();
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
                if (previous && current.previous !== undefined && previous !== current.previous) {
                    return true;
                }
                if (current.previous === undefined) {
                    current.previous = previous;
                }
                previous = current;
                current = current.next;
            } while (current);
            return false;
        };
    });
    its();
    after(reload);
});

/**
 * Check the Entire List So Far
 *
 * O(n^2) time complexity
 *
 * For each node, assume that the portion of the list examined
 * so for has no loops and check to see if the next node creates
 * a loop by iterating again over the entire list up to that point.
 */
describe("Check the Entire List So Far", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var current = head.next;
            var i = 0;
            var check;
            var j;
            do {
                check = head;
                j = 0;
                do {
                    if (check === current) {
                        return true;
                    }
                    j += 1;
                    check = check.next;
                } while (j < i && check);
                i += 1;
                current = current.next;
            } while (current);
            return false;
        };
    });
    its();
});

/**
 * Reverse the list
 *
 * O(n) time complexity
 *
 * If you reverse the list, and remember the inital node, you will
 * know that there is a cycle if you get back to the first node.
 * While efficient, this solution changes the list. Reversing the
 * list twice would put the list back in its initial state, however
 * this solution is not appropriate for multi-threaded applications.
 * In some cases there may not be a way to modify nodes. Since
 * changing the nodes is not needed to get the answer, this solution
 * is not recommended.
 */
describe("Check the Entire List So Far", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var previous = null;
            var current = head;
            var next;

            if (!current.next) {
                return false;
            }
            while (current) {
                next = current.next;
                current.next = previous;
                previous = current;
                current = next;
            }
            return (previous === head);
        };
    });
    its();
    after(reload);
});
