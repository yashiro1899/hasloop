/*global
    describe it before
*/
const head_G4 = require("./G4"); // with loop
const head_G30 = require("./G30"); // without loop
const head_G98 = require("./G98"); // with full loop where the last node links to the first
var hasloop;

function its() {
    "use strict";
    it("should return true when loop is present", function () {
        hasloop(head_G4())
            .should.be.equal(true);
    });
    it("should return true when full loop is present", function () {
        hasloop(head_G98())
            .should.be.equal(true);
    });
    it("should return false when loop is not present", function () {
        hasloop(head_G30())
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
 * If you encounter any node that doesn't link to the last node
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
 * If you reverse the list, and remember the initial node, you will
 * know that there is a cycle if you get back to the first node.
 * While efficient, this solution changes the list. Reversing the
 * list twice would put the list back in its initial state, however
 * this solution is not appropriate for multi-threaded applications.
 * In some cases there may not be a way to modify nodes. Since
 * changing the nodes is not needed to get the answer, this solution
 * is not recommended.
 */
describe("Reverse the list", function () {
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
});

/**
 * Use Memory Allocation Information
 *
 * O(n) time complexity in the amount of memory on the computer
 *
 * Some programming languages allow you to see meta information
 * about each node — the memory address at which it is allocated.
 * Because each node has a unique numeric address, it is possible
 * to use this information to detect cycles. For this algorithm,
 * keep track of the minimum memory address seen, the maximum
 * memory address seen, and the number of nodes seen. If more nodes
 * have been seen than can fit in the address space then some node
 * must have been seen twice and there is a cycle.
 *
 *
 * bool hasloop(node_t * head) {
 *     node_t * current = head;
 *     uintptr_t min =  (uintptr_t) current;
 *     uintptr_t max = min + 0x10;
 *     uintptr_t nodes = 0;
 *     while (current != NULL) {
 *         nodes++;
 *         if ((uintptr_t) current < min) min = (uintptr_t) current;
 *         if ((uintptr_t) current > max) max = (uintptr_t) current;
 *         if (max - min < nodes) return true;
 *         current = current->next;
 *     }
 *     return false;
 * }
 *
 *
 * This algorithm relies on being able to see memory address information.
 * This is not possible to implement in some programming languages such as
 * Javascript that do not make this information available. So I didn't
 * implement this algorithm. It is likely that the entire list will be allocated
 * close together in memory. In such a case the implementation will run close
 * to the running time of the length of the list. However, if the nodes in the
 * list are allocated over a large memory space, the runtime of this algorithm
 * could be much greater than some of the best solutions.
 */

/**
 * Catch Larger and Larger Loops
 *
 * O(n) time complexity
 *
 * Always store some node to check. Occasionally reset this node to avoid the
 * "Detect Only Full Loops" problem. When resetting it, double the amount of
 * time before resetting it again.
 *
 *
 * This solution is O(n) because `sinceScale` grows linearly with the number of
 * calls to next(). Once `sinceScale` is greater than the size of the loop, another
 * n calls to next() may be required to detect the loop. This solution requires
 * up to 3 traversals of the list.
 *
 * This solution was devised by Stephen Ostermiller and proven O(n) by Daniel Martin.
 */
describe("Catch Larger and Larger Loops", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var current = head;
            var check = null;
            var since = 0;
            var sinceScale = 2;
            do {
                if (check === current) {
                    return true;
                }
                if (since >= sinceScale) {
                    check = current;
                    since = 0;
                    sinceScale *= 2;
                }
                since += 1;
                current = current.next;
            } while (current);
            return false;
        };
    });
    its();
});

/**
 * Catch Loops in Two Passes
 *
 * O(n) time complexity
 *
 * Simultaneously go through the list by ones (slow iterator) and by twos
 * (fast iterator). If there is a loop the fast iterator will go around that
 * loop twice as fast as the slow iterator. The fast iterator will lap the
 * slow iterator within a single pass through the cycle. Detecting a loop is
 * then just detecting that the slow iterator has been lapped by the fast
 * iterator.
 *
 *
 * This solution is "Floyd's Cycle-Finding Algorithm" as published in
 * "Non-deterministic Algorithms" by Robert W. Floyd in 1967. It is also
 * called "The Tortoise and the Hare Algorithm".
 */
describe("Catch Loops in Two Passes", function () {
    "use strict";
    before(function () {
        hasloop = function (head) {
            var slow = head;
            var fast1 = head;
            var fast2 = head;

            do {
                fast1 = fast2 && fast2.next;
                fast2 = fast1 && fast1.next;
                if (slow === fast1 || slow === fast2) {
                    return true;
                }
                slow = slow.next;
            } while (slow && fast1 && fast2);
            return false;
        };
    });
    its();
});
